import { likeBlog } from "@/app/actions/blogs";
import { findBlogById } from "@/app/services/blogs";
import BlogPage from "../BlogPage";
import { getReadingListByBlogId } from "@/app/services/readingList";
import { createReadingList } from "@/app/actions/readingList";
import { getCurrentUser } from "@/app/services/session";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await findBlogById(Number(id));
  const currentUser = await getCurrentUser();
  const blogInReadingList = await getReadingListByBlogId(blog.id, Number(currentUser?.id));

  return (
    <div>
      <BlogPage blogs={[blog]}>
        <div className="flex gap-4">
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="btn">
              Like
            </button>
          </form>
          {!blogInReadingList && (
            <form action={createReadingList}>
              <input type="hidden" name="blogId" value={blog.id} />
              <input type="hidden" name="userId" value={currentUser?.id} />
              <button
                type="submit"
                className="btn"
                data-testid="add-to-reading-list-button"
              >
                Add to reading list
              </button>
            </form>
          )}
        </div>
      </BlogPage>
    </div>
  );
};
export default Blog;
