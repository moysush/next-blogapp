import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <form action={createBlog}>
        <div>
          <input type="text" name="title" placeholder="title"  className="inp"/>
        </div>
        <div>
          <input type="text" name="author" placeholder="author"  className="inp"/>
        </div>
        <div>
          <input type="text" name="url" placeholder="url"  className="inp"/>
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
