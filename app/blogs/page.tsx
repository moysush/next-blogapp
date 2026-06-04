import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>
            <h2>{b.title}</h2>
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
