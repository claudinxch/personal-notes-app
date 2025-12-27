import { pgTable, timestamp, index, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
    name: varchar('name', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => [
    uniqueIndex('tags_user_name_uq').on(table.userId, table.name),
    index('tags_user_id_idx').on(table.userId),
])