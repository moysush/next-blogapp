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
    <div>
      <form action={formAction}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="inp"
            defaultValue={state.values?.title}
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="author"
            className="inp"
            defaultValue={state.values?.author}
          />
        </div>
        <div>
          <input
            type="text"
            name="url"
            placeholder="url"
            className="inp"
            defaultValue={state.values?.url}
          />
        </div>
        {state && <p className="text-red-600">{state.error}</p>}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
