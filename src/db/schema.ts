import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey(), // Matches Supabase Auth User ID
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default('free'),
});

export const videosTable = pgTable("videos", {
  id: varchar({ length: 255 }).primaryKey(), // YouTube ID
  url: text().notNull(),
  title: text().notNull(),
  duration: integer(),
});

export const reportsTable = pgTable("reports", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoId: varchar("video_id", { length: 255 }).notNull().references(() => videosTable.id),
  userId: uuid("user_id").references(() => usersTable.id), // Link Report to User
  markdownContent: text("markdown_content").notNull(),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
