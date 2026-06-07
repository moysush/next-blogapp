"use server";

import { revalidatePath } from "next/cache";
import { addBlog, addLike } from "../services/blogs";
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

export const likeBlog = async (formData: FormData) => {
  const id = formData.get("id");
  addLike(Number(id));

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
};

export const searchBlogs = async (formData: FormData) => {
  const filterText = formData.get("filter");
  if (filterText) {
    // revalidatePath(`/blogs?filter=${filterText}`);
    redirect(`/blogs?filter=${filterText}`);
  }
  // revalidatePath("/blogs");
  redirect("/blogs");
};
