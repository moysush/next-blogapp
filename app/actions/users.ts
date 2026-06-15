"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const registerUser = async (
  prevState: { error: string, values: object },
  formData: FormData,
) => {
  const rawPassword = String(formData.get("password"));
  const confirmPassword = String(formData.get("passwordConfirm"));
  const password = await bcrypt.hash(rawPassword, 10);

  const user = {
    name: String(formData.get("name")),
    username: String(formData.get("username")),
    passwordHash: String(password),
  };

  const values = {
    name: user.name,
    username: user.username,
    password: rawPassword,
    passwordConfirm: confirmPassword,
  };

  // validations
  if (user.username.length < 4) {
    return {
      error: "Username must be at least 4 characters long",
      values,
    };
  }
  if (rawPassword.length < 4) {
    return {
      error: "Password must be at least 4 characters long",
      values,
    };
  }
  if (confirmPassword !== rawPassword) {
    return {
      error: "Passwords must match",
      values,
    };
  }
  const userExist = await db.query.users.findFirst({
    where: eq(users.username, user.username),
  });
  if (userExist) {
    return {
      error: "Username already exists",
      values,
    };
  }

  await db.insert(users).values(user);

  revalidatePath("/login");
  redirect("/login");
};
