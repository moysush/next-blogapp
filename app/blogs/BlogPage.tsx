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
    <div data-testid="blogs-list">
      <ul className="space-y-4" data-testid="blog-detail">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((b) => (
            <li key={b.id} className="blog">
              <Link href={`/blogs/${b.id}`}>
                <h2 className="text-2xl url" data-testid="blog-title">
                  {b.title}
                </h2>
              </Link>
              <p data-testid="blog-author"> - {b.author}</p>
              <a
                href={b.url.includes("https://") ? b.url : `https://${b.url}`}
                className="url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {b.url}
              </a>
              <p>{b.likes} likes</p>
              {children}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogPage;
