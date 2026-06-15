"use server";

import { revalidatePath } from "next/cache";
import { addBlog, addLike } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: { error: string; values: object },
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

  const values = { title: blog.title, author: blog.author, url: blog.url };

  if (blog.title.length < 5) {
    return {
      error: "Title must be of at least 5 characters long",
      values,
    };
  }
  if (blog.author.length < 5) {
    return {
      error: "Author must be of at least 5 characters long",
      values,
    };
  }
  if (blog.url.length < 5) {
    return {
      error: "URL must be of at least 5 characters long",
      values,
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
