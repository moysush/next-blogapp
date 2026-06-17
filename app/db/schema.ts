import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  author: text().notNull(),
  url: text().notNull(),
  likes: integer().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text().unique().notNull(),
  name: text().notNull(),
  passwordHash: text().notNull().default(""),
  token: text(),
});

export const readingList = pgTable("reading_list", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id),
  read: boolean().default(false),
});

// relations are only for retrieving data in the app, does not affect the actual database
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}));

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}));

// const relations = relations({ users, blogs }, (r) => {
//   blogs: {
//     users: r.one.users({
//       from: r.blogs.userId,
//       to: r.users.id
//     })
//   }
// })
