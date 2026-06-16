import { redirect } from "next/navigation";
import { createToken } from "../actions/users";
import { getCurrentUser } from "../services/session";

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

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
    </div>
  );
};

export default Me;
