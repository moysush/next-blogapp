import { getUserWithBlogsByToken } from "@/app/services/users";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const header = (await headers()).get("authorization");
  const token = String(header?.substring(7));
  const user = await getUserWithBlogsByToken(token);

  if (!token || !user) {
    return NextResponse.json({ error: "Not a valid token" }, { status: 411 });
  }

  return NextResponse.json(user);
};
