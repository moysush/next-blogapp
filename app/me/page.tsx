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
      <div data-testid="user-profile">
        <h2 className="text-2xl font-black">My Profile</h2>
        <p data-testid="user-name">
          <strong>Name:</strong> {user.name}
        </p>
        <p data-testid="user-username">
          <strong>Username:</strong> {user.username}
        </p>
      </div>
      <hr />
      <form action={createToken} data-testid="api-token-section">
        <h4 className="text-xl font-bold">API Token</h4>
        <div data-testid="token-display">
          <p>Current Token:</p>
          {user.token ? (
            <p data-testid="api-token">{user.token}</p>
          ) : (
            <p data-testid="no-token-message">No token exist...</p>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          data-testid="generate-token-button"
        >
          Generate New Token
        </button>
      </form>
      <hr />
      <div data-testid="reading-list-section">
        <h2 className="text-xl font-bold">Reading List</h2>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list">There is no blog yet...</p>
        ) : (
          <>
            <ReadingListPage readingList={unRead} title="Unread" />
            <ReadingListPage readingList={read} title="Read" />
          </>
        )}
      </div>
    </div>
  );
};

export default Me;
