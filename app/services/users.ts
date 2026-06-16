import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
  return user;
};

export const getUserWithBlogsByToken = async (token: string) => {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      username: true,
      name: true,
    },
    where: eq(users.token, token),
    with: {
      blogs: {
        columns: {
          author: true,
          title: true,
          url: true,
        },
      },
    },
  });
  return user;
};

export const addToken = async () => {
  return crypto.randomUUID();
};
