import { and, eq } from "drizzle-orm";
import { db } from "../../config/db";
import { notes } from "../../db/schema/notes";
import { InternalServerError, NotFoundError } from "../../utils/errors";
import type { CreateNote, UpdateNote } from "./types";

export class NotesRepository {
    createNote = async (userId: string, data: Omit<CreateNote, 'tags'>) => {
        const [note] = await db.insert(notes).values({
            userId,
            title: data.title,
            content: data.content
        }).returning()
        
        if (!note) throw new InternalServerError("Failed to create note")

        return note
    }

    getNotesByUserId = async (userId: string) => {
        const userNotes = await db.select().from(notes).where(and(eq(notes.userId, userId), eq(notes.isDeleted, false)))

        return userNotes
    }

    getNoteById = async (noteId: string, userId: string) => {
        const [note] = await db.select().from(notes).where(and(eq(notes.id, noteId), eq(notes.userId, userId), eq(notes.isDeleted, false)))

        if (!note) throw new NotFoundError("Note not found")
        
        return note
    }

    updateNote = async (noteId: string, userId: string, data: Omit<UpdateNote, 'tags'>) => {
        const [updatedNote] = await db.update(notes).set({ ...data, updatedAt: new Date() }).
            where(and(
                eq(notes.id, noteId), 
                eq(notes.userId, userId), 
                eq(notes.isDeleted, false)
            )).returning()

        if (!updatedNote) throw new NotFoundError("Note not found")

        return updatedNote
    }

    softDeleteNote = async (noteId: string, userId: string) => {
        const [deletedNote] = await db.update(notes).set({ isDeleted: true, deletedAt: new Date() }).
            where(and(
                eq(notes.id, noteId), 
                eq(notes.userId, userId), 
                eq(notes.isDeleted, false)
            )).returning()

        if (!deletedNote) throw new NotFoundError("Note not found")

        return deletedNote
    }

    getSoftDeletedNotes = async (userId: string) => {
        const userNotes = await db.select().from(notes).where(and(eq(notes.userId, userId), eq(notes.isDeleted, true)))

        return userNotes
    }

    deleteNote = async (noteId: string, userId: string) => {
        const [deletedNote] = await db.delete(notes).where(and(eq(notes.id, noteId), eq(notes.userId, userId))).returning()

        if(!deletedNote) throw new NotFoundError("Note not found")

        return deletedNote
    }

    restoreNote = async (noteId: string, userId: string) => {
        const [restoredNote] = await db.update(notes).set({ 
            isDeleted: false, 
            deletedAt: null, 
            updatedAt: new Date() 
        })
        .where(and(
            eq(notes.id, noteId), 
            eq(notes.userId, userId), 
            eq(notes.isDeleted, true)
        )).returning()

        if (!restoredNote) throw new NotFoundError("Note not found")
   
        return restoredNote
    }

    // addTagToNote(noteId, tagId)
    // removeTagFromNote(noteId, tagId)
}