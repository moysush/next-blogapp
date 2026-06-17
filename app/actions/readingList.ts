"use server";

import { revalidatePath } from "next/cache";
import { addBlogtoReadingList, markReadToggle } from "../services/readingList";

export const createReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));
  const userId = Number(formData.get("userId"));

  await addBlogtoReadingList(userId, blogId);

  revalidatePath(`/blogs/${blogId}`);
};

export const markAsRead = async (formData: FormData) => {
  const id = Number(formData.get("readingListId"));
  await markReadToggle(id);

  revalidatePath(`/me`);
};
