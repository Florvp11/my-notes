import note_repository from "../repositories/note_repository";
import category_repository from "../repositories/category_repository";

class NoteService {
  private note_repository = note_repository;
  private category_repository = category_repository;

  async createNote(data: { title: string; content: string }) {
    if (!data.title || data.title.trim() === "") {
      throw {
        status: 400,
        message: "El título de la nota no puede estar vacio",
      };
    }
    if (!data.content) {
      throw {
        status: 400,
        message: "El contenido de la nota no puede ser vacio",
      };
    }

    return this.note_repository.create(data);
  }

  async getActiveNotes() {
    return this.note_repository.findAllActive();
  }

  async getArchivedNotes() {
    return this.note_repository.findAllArchived();
  }

  async getNoteById(note_id: number) {
    const note = await this.note_repository.findById(note_id);
    if (!note) throw new Error("Nota no encontrada");
    return note;
  }

  async updateNote(
    note_id: number,
    data: { title?: string; content?: string }
  ) {
    if (!data.title || data.title.trim() === "") {
      throw {
        status: 400,
        message: "El título de la nota no puede estar vacio",
      };
    }
    if (!data.content) {
      throw {
        status: 400,
        message: "El contenido de la nota no puede ser vacio",
      };
    }
    await this.getNoteById(note_id);
    return this.note_repository.update(note_id, data);
  }

  async deleteNote(note_id: number) {
    await this.getNoteById(note_id);
    return this.note_repository.delete(note_id);
  }

  async archiveNote(note_id: number) {
    await this.getNoteById(note_id);
    return this.note_repository.archive(note_id);
  }

  async unarchiveNote(note_id: number) {
    await this.getNoteById(note_id);
    return this.note_repository.unarchive(note_id);
  }

  async addCategoryToNote(note_id: number, category_id: number) {
    await this.getNoteById(note_id);

    const category = await this.category_repository.findById(category_id);
    if (!category) throw new Error("Categoría no encontrada");

    return this.note_repository.addCategory(note_id, category_id);
  }

  async removeNoteCategory(note_id: number, category_id: number) {
    await this.getNoteById(note_id);

    const category = await this.category_repository.findById(category_id);
    if (!category) throw new Error("Categoría no encontrada");

    return this.note_repository.removeCategory(note_id, category_id);
  }

  async findNotesByCategory(category_id: number) {
    const category = await this.category_repository.findById(category_id);
    if (!category) throw new Error("Categoría no encontrada");

    return this.note_repository.findNotesByCategory(category_id);
  }
}

const note_service = new NoteService();
export default note_service;
