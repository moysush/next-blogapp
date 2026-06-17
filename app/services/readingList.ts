import { eq } from "drizzle-orm";
import { db } from "../db";
import { readingList } from "../db/schema";

export const getReadingList = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
};

export const getReadingListByBlogId = async (blogId: number) => {
  return await db.query.readingList.findFirst({
    where: eq(readingList.blogId, blogId),
    with: {
      blog: true,
    },
  });
};

export const addBlogtoReadingList = async (userId: number, blogId: number) => {
  return await db.insert(readingList).values({ userId, blogId });
};
