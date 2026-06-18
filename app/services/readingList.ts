import { and, eq } from "drizzle-orm";
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

export const getReadingListByBlogId = async (
  blogId: number,
  userId: number,
) => {
  return await db.query.readingList.findFirst({
    where: and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)),
    with: {
      blog: true,
    },
  });
};

export const addBlogtoReadingList = async (userId: number, blogId: number) => {
  return await db.insert(readingList).values({ userId, blogId });
};

export const markReadToggle = async (readingListId: number) => {
  const readStatus = await db.query.readingList.findFirst({
    where: eq(readingList.id, readingListId),
    columns: { read: true },
  });

  if (!readStatus) {
    return null;
  }

  return await db
    .update(readingList)
    .set({ read: !readStatus.read })
    .where(eq(readingList.id, readingListId));
};
