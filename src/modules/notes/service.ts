import { NotesRepository } from "./repository";
import type { CreateNote, UpdateNote } from "./types";

export class NotesService {
    constructor (private repo = new NotesRepository()) {}

    createNote = async (userId: string, payload: CreateNote) => {
        const note = await this.repo.createNote(userId, payload)
        // TODO: check if there are tags, link it to notes and return notes with tags
        return note
    }

    getNotesByUser = async (userId: string) => {
        const notes = await this.repo.getNotesByUserId(userId)
        // TODO: for each note fetch its tags, return notes with tags
        return notes
    }

    getNoteById = async (noteId: string, userId: string) => {
        const note = await this.repo.getNoteById(noteId, userId)
        // TODO:fetch its tags, return note with tags
        return note
    }

    updateNote = async (noteId: string, userId: string, payload: UpdateNote) => {
        const updatedNote = await this.repo.updateNote(noteId, userId, payload)
//         If tags provided: remove all existing tag links, then add new ones
// Fetch updated note with tags
        return updatedNote
    }

    deleteNote = async (noteId: string , userId: string) => {
        return await this.repo.softDeleteNote(noteId, userId)
    }

    deleteNotePermanently = async (noteId: string, userId: string) => {
        return await this.repo.deleteNote(noteId, userId)
    }

    getSoftDeletedNotes = async (userId: string) => {
        return await this.repo.getSoftDeletedNotes(userId)
    }

    restoreNote = async (noteId: string, userId: string) => {
        return await this.repo.restoreNote(noteId, userId)
    }
}