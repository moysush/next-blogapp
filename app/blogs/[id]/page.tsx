import { likeBlog } from "@/app/actions/blogs";
import { findBlogById } from "@/app/services/blogs";
import BlogPage from "../BlogPage";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await findBlogById(Number(id));

  return (
    <div>
      <BlogPage blogs={[blog]}>
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" className="btn">
            + add like
          </button>
        </form>
      </BlogPage>
    </div>
  );
};
export default Blog;
