"use server";

import { revalidatePath } from "next/cache";
import { addBlog, addLike } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const blog = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    url: formData.get("url") as string,
  };

  if (blog.title.length < 5 || blog.author.length < 5 || blog.url.length < 5) {
    return {
      error: "title, author, and url must be of at least 5 characters long",
    };
  }
  await addBlog(blog);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const id = formData.get("id");
  await addLike(Number(id));

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
