import { db } from "@/app/db";
import { blogs, readingList, users } from "@/app/db/schema";
import { NextResponse } from "next/server";

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  try {
    await db.delete(blogs);
    await db.delete(readingList);
    await db.delete(users);
    return NextResponse.json({ messages: "All datas were deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
