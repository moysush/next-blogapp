import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();
  return (
    <div>
      <h2 className="text-2xl mb-4">Users</h2>
      <ul className="user">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.username}`}
            className="text-2xl list-item list-disc url"
          >
            {user.name}
            <br />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Users;
