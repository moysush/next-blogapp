const blogs = [
  {
    id: "0",
    title: "React Components: A Deep Dive into Lifecycle and Hooks",
    author: "Dan Abramov",
    url: "https://overreacted.io/react-components-deep-dive/",
    likes: 42,
  },
  {
    id: "1",
    title: "Understanding the Node.js Event Loop",
    author: "Bert Belder",
    url: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/",
    likes: 128,
  },
  {
    id: "2",
    title: "Designing Resilient Relational Database Schemas",
    author: "Martin Kleppmann",
    url: "https://martin.kleppmann.com/2026/05/resilient-schemas/",
    likes: 85,
  },
];

const nextId = 4;

export const getBlogs = () => {
  return blogs;
};
