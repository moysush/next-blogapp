import { redirect } from "next/navigation";
import { createToken } from "../actions/users";
import { getCurrentUser } from "../services/session";
import { getReadingList } from "../services/readingList";
import Link from "next/link";

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user?.id);

  return (
    <div className="user space-y-2">
      <h2 className="text-2xl">My Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <hr />
      <form action={createToken}>
        <h4 className="text-xl">API Token</h4>
        <div>
          <p>Current Token:</p>
          <p>{user.token}</p>
        </div>
        <button type="submit" className="btn">
          Generate New Token
        </button>
      </form>
      <div>
        <h2 className="text-xl">Reading List</h2>
        <ul className="">
          {readingList.map((r) => (
            <Link
              key={r.id}
              href={`/blogs/${r.blogId}`}
              className="url list-inside list-decimal list-item"
            >
              {r.blog.title} - {r.blog.author}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Me;
