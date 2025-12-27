import { pgTable, uuid } from "drizzle-orm/pg-core";
import { notes } from "./notes";
import { tags } from "./tags";

export const notesTags = pgTable('notes_tags', {
    noteId: uuid('note_id').references(() => notes.id).notNull(),
    tagId: uuid('tag_id').references(() => tags.id).notNull(),
})