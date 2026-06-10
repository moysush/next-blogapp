import { getUserWithBlogs } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);
  if (!user) return notFound();
  return (
    <div>
      <h2 className="text-2xl">{user.name}</h2>
      <p>{user.username}</p>
      <ul>
        {user.blogs.map((b) => (
          <li className="blog mb-2" key={b.id}>
            <Link href={`/blogs/${b.id}`} className="url">
              {b.title}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
