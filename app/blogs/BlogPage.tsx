import { Blog } from "@/types";
import Link from "next/link";
import React from "react";

const BlogPage = ({
  blogs,
  children,
}: {
  blogs: Blog[];
  children?: React.ReactNode;
}) => {
  return (
    <ul className="space-y-4">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((b) => (
          <li key={b.id} className="blog">
            <Link href={`/blogs/${b.id}`}>
              <h2 className="text-lg url">{b.title}</h2>
            </Link>
            <p> - {b.author}</p>
            <a href={b.url}>{b.url}</a>
            <p>Likes: {b.likes}</p>
            {children}
          </li>
        ))}
    </ul>
  );
};

export default BlogPage;
