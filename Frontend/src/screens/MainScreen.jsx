import { useEffect, useState } from "react";
import notes_services from "../services/notes_services";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";
import ModalCreateNote from "../components/modal/ModalCreateNote";
import categories_services from "../services/categories_services";

export default function MainScreen() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [openNoteModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notes_services.getActivedNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const data = await categories_services.getAllCategories();
    setCategories(data);
  };

  const handleCreateNote = async ({ title, content }) => {
    if (!title.trim() || !content.trim()) {
      setError("La nota debe tener titulo y contenido");
      return;
    }

    try {
      await notes_services.createNote({ title, content });
      setError("");
      setOpenModal(false);
      fetchNotes();
    } catch (err) {
      setError(" Algo salió mal al crear la nota");
    }
  };

  const handleFilterNotes = async (categoriesIds) => {
    setSelectedCats(categoriesIds);

    try {
      setLoading(true);

      if (categoriesIds.length === 0) {
        const data = await notes_services.getActivedNotes();
        setNotes(data);
        return;
      }

      if (categoriesIds.length === 1) {
        const data = await notes_services.getNotesByCategory(categoriesIds[0]);
        setNotes(data);
        return;
      }
    } catch (error) {
      console.error("Error al filtrar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const toggleCategory = (id) => {
    const isSelected = selectedCats[0] === id;

    const newSelected = isSelected ? [] : [id];

    setSelectedCats(newSelected);
    handleFilterNotes(newSelected);
  };
  return (
    <main className="main-content">
      <section className="top-actions">
        <aside className="filter-panel">
          <h2>Filtrar por categoría</h2>

          {categories.length === 0 ? (
            <button
              className="btn-create-category"
              title="Crear categoria"
              onClick={() => navigate("/categories")}
            >
              Crear categoría
            </button>
          ) : (
            categories.map((cat) => (
              <label key={cat.id} className="filter-item">
                <input
                  type="checkbox"
                  checked={selectedCats[0] === cat.id}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))
          )}
        </aside>
        <div className="top-actions">
          <button
            title="Crear Nota"
            className="btn-create"
            onClick={() => setOpenModal(true)}
          >
            Crear Nota
          </button>
        </div>
      </section>

      <ModalCreateNote
        open={openNoteModal}
        closeModal={() => {
          setError("");
          setOpenModal(false);
        }}
        create={handleCreateNote}
        error={error}
      />

      {loading ? (
        <h2>Cargando...</h2>
      ) : notes.length === 0 ? (
        <div className="no-notes">
          <p>No tenés ninguna nota todavía.</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div
              onClick={() => navigate("/note/" + note.id)}
              className="note-card"
              key={note.id}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
