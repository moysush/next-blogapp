import Link from "next/link";
import { markAsRead } from "../actions/readingList";

type ReadingListTypes = {
  read: boolean | null;
  id: number;
  userId: number;
  blogId: number;
  blog: {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
    userId: number;
  };
};

const ReadingListPage = ({
  readingList,
  title,
  children,
}: {
  readingList: ReadingListTypes[];
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <ul
        data-testid={
          title === "Read"
            ? ""
            : readingList.length === 0
              ? "no-unread-blogs"
              : "unread-section"
        }
      >
        <h4 className="font-bold">
          {title} ({readingList.length})
        </h4>
        {readingList.map((r) => (
          <div
            key={r.id}
            className={`flex items-center justify-between bg-${title === "Read" ? "green" : "yellow"}-100 rounded my-2 p-2`}
          >
            <Link href={`/blogs/${r.blogId}`} className="url">
              {r.blog.title}
            </Link>
            <form action={markAsRead}>
              <input type="hidden" name="readingListId" value={r.id} />
              <input
                type="hidden"
                name="readingListRead"
                value={r.read ? "true" : "false"}
              />
              <button
                type="submit"
                className="btn"
                data-testid={`mark-read-${r.id}`}
              >
                {title === "Read" ? "Mark as Unread" : "Mark as Read"}
              </button>
            </form>
          </div>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default ReadingListPage;
