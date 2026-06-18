"use client";

import { useNotification } from "@/app/ components/NotificationContext";
import { createBlog } from "@/app/actions/blogs";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const NewBlog = () => {
  const { showNotification } = useNotification();
  const router = useRouter();
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    values: { title: "", author: "", url: "" },
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created", "success");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction} className="form">
      <h2 className="text-2xl mb-2">Create Blog</h2>
      <label>
        Title
        <input
          type="text"
          name="title"
          placeholder="title"
          className="inp"
          defaultValue={state.values?.title}
        />
      </label>
      <label>
        Author
        <input
          type="text"
          name="author"
          placeholder="author"
          className="inp"
          defaultValue={state.values?.author}
        />
      </label>
      <label>URL
      <input
        type="text"
        name="url"
        placeholder="url"
        className="inp"
        defaultValue={state.values?.url}
      />
      </label>
      {state && <p className="text-red-600">{state.error}</p>}
      <button type="submit" className="btn" data-testid="create-blog-button">
        Create
      </button>
    </form>
  );
};

export default NewBlog;
