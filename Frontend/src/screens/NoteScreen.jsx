import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notes_services from "../services/notes_services";
import categories_services from "../services/categories_services";
import { FaTrashAlt } from "react-icons/fa";
import "./NoteScreen.css";
import { FiDelete } from "react-icons/fi";

export default function NoteScreen() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cate, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [errorEdit, setErrorEdit] = useState("");

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNote = async () => {
    try {
      const data = await notes_services.getNoteById(id);
      setNote(data);
      setEditTitle(data.title);
      setEditContent(data.content);
    } catch (error) {
      console.error("Error al cargar la nota", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const handleDeleteNote = async () => {
    try {
      await notes_services.deleteNote(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleCategories = async () => {
    if (!showCategories) {
      try {
        const data = await categories_services.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    }
    setShowCategories(!showCategories);
  };

  const assignCategory = async (category_id) => {
    try {
      await notes_services.addCategoryToNote(id, category_id);
      fetchNote();
    } catch (error) {
      console.error("Error asignando categoría", error);
    }
  };
  const removeCategory = async (category_id) => {
    try {
      await notes_services.removeCategoryFromNote(id, category_id);
      fetchNote();
    } catch (error) {
      console.error("Error al quitar categoría", error);
    }
  };
  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setErrorEdit("El título y el contenido no pueden estar vacíos ");
      return;
    }

    setErrorEdit("");

    try {
      await notes_services.updateNote(id, {
        title: editTitle,
        content: editContent,
      });

      await fetchNote();
      setIsEditing(false);
    } catch (error) {
      console.error("Error actualizando nota", error);
    }
  };

  const handleToggleArchive = async () => {
    try {
      if (note.archived) {
        await notes_services.unarchiveNote(id);
      } else {
        await notes_services.archiveNote(id);
      }

      await fetchNote();
    } catch (error) {
      console.error("Error cambiando estado de archivo", error);
    }
  };
  if (loading) return <h2>Cargando..</h2>;
  if (!note) return <h2>La nota no existe</h2>;
  return (
    <section className=" note-detail">
      <div className="note-main">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Nuevo título"
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Nuevo contenido"
            ></textarea>
            {errorEdit && <p className="error-text">{errorEdit}</p>}
            <div className="edit-btns ">
              <button
                title="Guardar Cambios"
                className="button-notes"
                onClick={handleSaveEdit}
              >
                Guardar cambios
              </button>
              <button
                title="Cancelar"
                className="button-notes"
                onClick={() => {
                  setIsEditing(false);
                  setErrorEdit("");
                  setEditTitle(note.title);
                  setEditContent(note.content);
                }}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{note.title}</h1>
            <p>{note.content}</p>

            <button
              title="Editar Nota"
              className="edit-btn button-notes"
              onClick={() => {
                setIsEditing(true);
                setErrorEdit("");
              }}
            >
              Editar nota
            </button>
          </>
        )}

        <h3>Categorías asignadas:</h3>
        <div className="tags">
          {note.categories?.map((cat) => (
            <button
              title="Eliminar Categoria"
              key={cat.id}
              className="assigned-cat-btn button-notes"
              onClick={() => removeCategory(cat.id)}
            >
              {cat.name} <FiDelete />
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className="button-notes" onClick={handleDeleteNote}>
          <FaTrashAlt />
        </button>
        <button
          title="Archivar"
          className="button-notes"
          onClick={handleToggleArchive}
        >
          {note.archived ? "Desarchivar" : "Archivar"}
        </button>
        <div>
          <button
            title="Agregar Categoria"
            className="button-notes"
            onClick={handleToggleCategories}
          >
            Agregar Categoria
          </button>
          {showCategories &&
            cate.map((c) => (
              <button
                className="button-notes"
                key={c.id}
                onClick={() => assignCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}
