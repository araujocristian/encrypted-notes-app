import CryptoJS from 'crypto-js'
import storage from "../storage";
import { debounce } from ".";
import { Note, UserData } from "../types";

const STORAGE_KEY = "notes";

export const saveNote = debounce((note: Note, {username, passphrase}: UserData) => {
  const noteIds = storage.get<string[]>(`${username}:${STORAGE_KEY}`, []);
  const noteIdsWithoutNote = noteIds.filter((id) => id !== note.id);

  storage.set(`${username}:${STORAGE_KEY}`, [...noteIdsWithoutNote, note.id]);

  const encryptedNote = CryptoJS.AES.encrypt(
    JSON.stringify(note),
    passphrase
  ).toString()

  storage.set(`${username}:${STORAGE_KEY}:${note.id}`, encryptedNote);
}, 200);

export const loadNotes = ({username, passphrase}: UserData) => {
  const noteIds = storage.get<string[]>(`${username}:${STORAGE_KEY}`, []);
  const notes: Record<string, Note> = {};

  noteIds.forEach((id) => {
    const encryptedNote = storage.get<string>(`${username}:${STORAGE_KEY}:${id}`);
    
    const note: Note = JSON.parse(
      CryptoJS.AES.decrypt(encryptedNote, passphrase).toString(CryptoJS.enc.Utf8)
    ) 

    notes[note.id] = {
      ...note,
      updatedAt: new Date(note.updatedAt),
    };
  });

  return notes;
};
