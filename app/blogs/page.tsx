import Link from "next/link";
import { getBlogs, filterBlogs } from "../services/blogs";
import { searchBlogs } from "../actions/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const allBlogs = getBlogs();
  const { filter } = await searchParams;
  const filteredBlogs = filterBlogs(String(filter));
  const blogs = filter ? filteredBlogs : allBlogs;

  return (
    <div>
      <h2>Blogs</h2>
      <form action={searchBlogs}>
        <input placeholder="Search" name="filter" defaultValue={filter || ""} />
        <button type="submit">Submit</button>
      </form>
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
