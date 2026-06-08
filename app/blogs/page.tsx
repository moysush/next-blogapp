import { getBlogs, filterBlogs } from "../services/blogs";
import { searchBlogs } from "../actions/blogs";
import BlogPage from "./BlogPage";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const allBlogs = await getBlogs();
  const { filter } = await searchParams;
  const filteredBlogs = await filterBlogs(String(filter));
  const blogs = filter ? filteredBlogs : allBlogs;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl">Blogs</h2>
      <form action={searchBlogs} className="space-x-2">
        <input
          placeholder="Search"
          name="filter"
          defaultValue={filter || ""}
          className="inp"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <BlogPage blogs={blogs} />
    </div>
  );
};

export default Blogs;
