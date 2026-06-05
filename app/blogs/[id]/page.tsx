import { likeBlog } from "@/app/actions/blogs";
import { findBlogById } from "@/app/services/blogs";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = findBlogById(Number(id));

  return (
    <div>
      <h2>{blog.title}</h2>
      <p> - {blog.author}</p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">+ add like</button>
      </form>
    </div>
  );
};
export default Blog;
