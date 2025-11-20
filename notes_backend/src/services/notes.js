'use strict';

/**
 * Simple in-memory Notes repository with a clear interface for future persistence.
 * Replace the repository implementation with a DB-backed one without changing consumers.
 */

// Internal in-memory store
const store = {
  notes: [],
  nextId: 1,
};

// PUBLIC_INTERFACE
function listNotes() {
  /**
   * Returns all notes sorted by createdAt ascending.
   * Each note: { id: number, title: string, content?: string, createdAt: ISOString, updatedAt: ISOString }
   */
  return [...store.notes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

// PUBLIC_INTERFACE
function createNote({ title, content = '' }) {
  /**
   * Create a new note with required title and optional content.
   */
  const now = new Date().toISOString();
  const note = {
    id: store.nextId++,
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  store.notes.push(note);
  return note;
}

// PUBLIC_INTERFACE
function updateNote(id, { title, content }) {
  /**
   * Update a note's title/content. At least one field should be present.
   * Returns updated note or null if not found.
   */
  const idx = store.notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;

  const current = store.notes[idx];
  // Only update provided fields
  const updated = {
    ...current,
    title: typeof title === 'string' ? title : current.title,
    content: typeof content === 'string' ? content : current.content,
    updatedAt: new Date().toISOString(),
  };
  store.notes[idx] = updated;
  return updated;
}

// PUBLIC_INTERFACE
function deleteNote(id) {
  /**
   * Delete a note by id. Returns true if deleted, false if not found.
   */
  const idx = store.notes.findIndex((n) => n.id === id);
  if (idx === -1) return false;
  store.notes.splice(idx, 1);
  return true;
}

module.exports = {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
};
