import storage from "../storage"
import { Note } from "../types"

const STORAGE_KEY = 'notes'

export const saveNote = (note: Note) => {
  const noteIds = storage.get<string[]>(STORAGE_KEY, [])
  const noteIdsWithoutNote = noteIds.filter(id => id !== note.id)
  
  storage.set(STORAGE_KEY, [...noteIdsWithoutNote, note.id])
  storage.set(`${STORAGE_KEY}:${note.id}`, note)
}

export const loadNotes = () => {
  const noteIds = storage.get<string[]>(STORAGE_KEY, [])
  const notes: Record<string, Note> = {}

  noteIds.forEach((id) => {
    const note = storage.get<Note>(`${STORAGE_KEY}:${id}`)
    notes[note.id] = {
      ...note,
      updatedAt: new Date(note.updatedAt)
    }
  })

  return notes
}