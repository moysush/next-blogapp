"use server";

import { revalidatePath } from "next/cache";
import { addBlogtoReadingList } from "../services/readingList";

export const createReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));
  const userId = Number(formData.get("userId"));

  await addBlogtoReadingList(userId, blogId);

  revalidatePath(`/blogs/${blogId}`);
};
