"use server";

import { revalidatePath } from "next/cache";
import { addBlog } from "../services/blogs";
import { redirect } from "next/navigation";

export const createBlog = async (formData: FormData) => {
  const blog = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    url: formData.get("url") as string,
  };
  addBlog(blog);

  revalidatePath("/blogs");
  redirect("/blogs");
};
