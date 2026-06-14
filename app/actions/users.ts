"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";

export const registerUser = async (formData: FormData) => {
  const password = await bcrypt.hash(String(formData.get("password")), 10);

  const user = {
    name: String(formData.get("name")),
    username: String(formData.get("username")),
    passwordHash: String(password),
  };

  await db.insert(users).values(user);

  revalidatePath("/login");
  redirect("/login");
};
