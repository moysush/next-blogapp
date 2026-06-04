const blogs: Blog[] = [
  {
    id: 0,
    title: "React Components: A Deep Dive into Lifecycle and Hooks",
    author: "Dan Abramov",
    url: "https://overreacted.io/react-components-deep-dive/",
    likes: 42,
  },
  {
    id: 1,
    title: "Understanding the Node.js Event Loop",
    author: "Bert Belder",
    url: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/",
    likes: 128,
  },
  {
    id: 2,
    title: "Designing Resilient Relational Database Schemas",
    author: "Martin Kleppmann",
    url: "https://martin.kleppmann.com/2026/05/resilient-schemas/",
    likes: 85,
  },
];

export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

export type BlogInput = Omit<Blog, "id" | "likes">;

const nextId = 3;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (blog: BlogInput) => {
  return blogs.push({ ...blog, id: nextId, likes: 0 });
};
