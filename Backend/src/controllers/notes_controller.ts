import { Request, Response } from "express";
import note_service from "../services/note_service";

class NoteController {
  create = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;

      const note_created = await note_service.createNote({ title, content });

      return res.status(201).json(note_created);
    } catch (error: any) {
      return res
        .status(error.status || 500)
        .json({ error: error.message || "Error al crear la nota" });
    }
  };

  getActiveNotes = async (req: Request, res: Response) => {
    try {
      const active_notes = await note_service.getActiveNotes();
      return res.json(active_notes);
    } catch (error) {
      return res.status(500).json("Error al cargar notas");
    }
  };

  getArchivedNotes = async (req: Request, res: Response) => {
    try {
      const archived_notes = await note_service.getArchivedNotes();
      return res.json(archived_notes);
    } catch (error) {
      return res.status(500).json("Error al cargar notas archivadas");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.note_id);
      const note = await note_service.getNoteById(id);
      return res.json(note);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  updateNote = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const id = Number(req.params.note_id);
      const note = await note_service.updateNote(id, { title, content });
      return res.json(note);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  deleteNote = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.note_id);
      await note_service.deleteNote(id);
      return res.send({ message: "La nota se borro exitosamente" });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  archiveNote = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.note_id);
      const archive_note = await note_service.archiveNote(id);
      return res.json(archive_note);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
  unarchiveNote = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.note_id);
      const unarchive_note = await note_service.unarchiveNote(id);
      return res.json(unarchive_note);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  addCategory = async (req: Request, res: Response) => {
    try {
      const note_id = Number(req.params.note_id);
      const { category_id } = req.body;

      const updatedNote = await note_service.addCategoryToNote(
        note_id,
        Number(category_id)
      );

      return res.status(200).json(updatedNote);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  removeCat = async (req: Request, res: Response) => {
    try {
      const note_id = Number(req.params.note_id);
      const { category_id } = req.body;
      const updated = await note_service.removeNoteCategory(
        note_id,
        Number(category_id)
      );
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  findByCat = async (req: Request, res: Response) => {
    try {
      const category_id = req.params.id;
      const find_note = await note_service.findNotesByCategory(
        Number(category_id)
      );
      return res.json(find_note);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
}

const note_controller = new NoteController();
export default note_controller;
