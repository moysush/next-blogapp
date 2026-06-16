import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

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

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
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
