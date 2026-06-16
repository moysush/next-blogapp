import { redirect } from "next/navigation";
import { createToken } from "../actions/users";
import { getCurrentUser } from "../services/session";

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <hr />
      <h4>API Token</h4>
      <div>
        <p>Current Token:</p>
        <p>{user.token}</p>
      </div>
      <form action={createToken}>
        <button type="submit">Generate New Token</button>
      </form>
    </div>
  );
};

export default Me;
