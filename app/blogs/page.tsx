import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((b) => (
            <li key={b.id}>
              <Link href={`/blogs/${b.id}`}>
                <h2>{b.title}</h2>
              </Link>
              <p> - {b.author}</p>
              <a href={b.url}>link to the blog</a>
              <p>Likes: {b.likes}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
