import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  // getting the data from request and hash the password
  const data = await request.json();
  const { username, name, password } = data;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    name,
    passwordHash,
  };

  try {
    const user = await db.insert(users).values(newUser).returning();
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
