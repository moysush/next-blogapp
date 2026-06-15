"use client";

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" });
  return (
    <div>
      <form action={formAction}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="inp"
            minLength={5}
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="author"
            className="inp"
            minLength={5}
          />
        </div>
        <div>
          <input
            type="text"
            name="url"
            placeholder="url"
            className="inp"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
        {state && <p className="text-red-600">{state.error}</p>}
      </form>
    </div>
  );
};

export default NewBlog;
