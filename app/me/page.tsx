import { redirect } from "next/navigation";
import { createToken } from "../actions/users";
import { getCurrentUser } from "../services/session";
import { getReadingList } from "../services/readingList";
import ReadingListPage from "./ReadingListPage";

const Me = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user?.id);
  const read = readingList.filter((r) => r.read);
  const unRead = readingList.filter((r) => !r.read);

  return (
    <div className="user space-y-2">
      <h2 className="text-2xl font-black">My Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <hr />
      <form action={createToken}>
        <h4 className="text-xl font-bold">API Token</h4>
        <div>
          <p>Current Token:</p>
          <p>{user.token}</p>
        </div>
        <button type="submit" className="btn">
          Generate New Token
        </button>
      </form>
      <hr />
      <div>
        <h2 className="text-xl font-bold">Reading List</h2>
        <ReadingListPage readingList={unRead} title="Unread" />
        <ReadingListPage readingList={read} title="Read" />
      </div>
    </div>
  );
};

export default Me;
