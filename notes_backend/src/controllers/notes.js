'use strict';

const notesService = require('../services/notes');

class NotesController {
  // PUBLIC_INTERFACE
  /**
   * List all notes.
   */
  list(req, res) {
    const notes = notesService.listNotes();
    return res.status(200).json({ data: notes });
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note.
   * Body: { title: string, content?: string }
   */
  create(req, res) {
    const { title, content } = req.body || {};
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Field "title" is required and must be a non-empty string.',
      });
    }
    const note = notesService.createNote({ title: title.trim(), content: typeof content === 'string' ? content : '' });
    return res.status(201).json({ data: note });
  }

  // PUBLIC_INTERFACE
  /**
   * Update a note by id.
   * Params: id
   * Body: { title?: string, content?: string }
   */
  update(req, res) {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ValidationError', message: 'Invalid note id.' });
    }

    const { title, content } = req.body || {};
    if (title === undefined && content === undefined) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'At least one of "title" or "content" must be provided.',
      });
    }
    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'If provided, "title" must be a non-empty string.',
      });
    }
    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'If provided, "content" must be a string.',
      });
    }

    const updated = notesService.updateNote(id, {
      title: title !== undefined ? title.trim() : undefined,
      content,
    });
    if (!updated) {
      return res.status(404).json({ error: 'NotFound', message: `Note with id ${id} not found.` });
    }
    return res.status(200).json({ data: updated });
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by id.
   * Params: id
   */
  delete(req, res) {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ValidationError', message: 'Invalid note id.' });
    }
    const deleted = notesService.deleteNote(id);
    if (!deleted) {
      return res.status(404).json({ error: 'NotFound', message: `Note with id ${id} not found.` });
    }
    return res.status(204).send();
  }
}

module.exports = new NotesController();
