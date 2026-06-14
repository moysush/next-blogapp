import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();
  return (
    <div>
      <ul>
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.username}`}
            className="url text-2xl"
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
