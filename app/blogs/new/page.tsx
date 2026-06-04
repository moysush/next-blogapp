import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <form action={createBlog}>
        <div>
          <input type="text" name="title" placeholder="title" />
        </div>
        <div>
          <input type="text" name="author" placeholder="author" />
        </div>
        <div>
          <input type="text" name="url" placeholder="url" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
