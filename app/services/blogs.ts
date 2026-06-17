import { Blog } from "@/types";
import { notFound } from "next/navigation";
import { db } from "../db";
import { blogs, readingList } from "../db/schema";
import { eq, ilike } from "drizzle-orm";
import { getCurrentUser } from "./session";

export type BlogInput = Omit<Blog, "id" | "likes">;

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const addBlog = async (blog: BlogInput) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const addedBlog = await db
    .insert(blogs)
    .values({ ...blog, likes: 0, userId: user.id })
    .returning(); // returns the data

  // creating a readingList for the new blog
  await db
    .insert(readingList)
    .values({ userId: user.id, blogId: addedBlog[0].id });
};

export const findBlogById = async (id: number) => {
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
  if (!blog) {
    notFound();
  }
  return blog;
};

export const addLike = async (id: number) => {
  const blog = await findBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};

export const filterBlogs = async (filterText: string) => {
  const filteredBlogs = await db.query.blogs.findMany({
    where: ilike(blogs.title, `%${filterText}%`),
  });
  return filteredBlogs;
};
