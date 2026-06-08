import { Blog } from "@/types";
import { notFound } from "next/navigation";
import { db } from "../db";
import { blogs } from "../db/schema";
import { eq, ilike } from "drizzle-orm";

export type BlogInput = Omit<Blog, "id" | "likes">;

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const addBlog = async (blog: BlogInput) => {
  return await db.insert(blogs).values({ ...blog, likes: 0 });
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
