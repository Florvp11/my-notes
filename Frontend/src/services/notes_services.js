import { API_URL } from "./config";
class NotesService {
  async createNote(data) {
    const { title, content } = data;
    try {
      const res = await fetch(`${API_URL}/notes/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      return res.json();
    } catch (error) {
      console.error("Error al crear nota:", error);
      throw error;
    }
  }

  async deleteNote(note_id) {
    try {
      const res = await fetch(`${API_URL}/notes/${note_id}`, {
        method: "DELETE",
      });
      return res.json();
    } catch (error) {
      console.error("Error borrando nota :", error);
      throw error;
    }
  }
  async getActivedNotes() {
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: "GET",
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error al cargar notas :", error);
      throw error;
    }
  }
  async getArchivedNotes() {
    try {
      const res = await fetch(`${API_URL}/notes/archived`, {
        method: "GET",
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error al cargar notas archivadas :", error);
      throw error;
    }
  }

  async getNoteById(note_id) {
    try {
      const res = await fetch(`${API_URL}/notes/${note_id}`, {
        method: "GET",
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error al cargar la nota:", error);
      throw error;
    }
  }
  async archiveNote(note_id) {
    try {
      const res = await fetch(`${API_URL}/notes/${note_id}/archive`, {
        method: "PATCH",
      });
      return res.json();
    } catch (error) {
      console.error("Error al archivar nota:", error);
      throw error;
    }
  }
  async unarchiveNote(note_id) {
    try {
      const res = await fetch(
        `${API_URL}/notes/archived/${note_id}/unarchive`,
        {
          method: "PATCH",
        }
      );
      return res.json();
    } catch (error) {
      console.error("Error al desarchivar nota:", error);
      throw error;
    }
  }
  async updateNote(note_id, data) {
    try {
      const res = await fetch(`${API_URL}/notes/${note_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error al editar nota:", error);
      throw error;
    }
  }

  async removeCategoryFromNote(note_id, category_id) {
    try {
      const res = await fetch(`${API_URL}/notes/${note_id}/categories`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: category_id }),
      });
      return res.json();
    } catch (error) {
      console.error("Error al quitar categoría de la nota:", error);
      throw error;
    }
  }

  async addCategoryToNote(note_id, category_id) {
    return fetch(`http://localhost:3000/api/notes/${note_id}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: category_id }),
    });
  }

  async getNotesByCategory(category_id) {
    try {
      const res = await fetch(`${API_URL}/notes/category/${category_id}`, {
        method: "GET",
      });
      return res.json();
    } catch (error) {
      console.error("Error al filtrar notas por categoría:", error);
      throw error;
    }
  }
}

const notes_services = new NotesService();
export default notes_services;
