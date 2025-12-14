import { useState, useEffect } from "react";
import "./ModalCreateNote.css";

export default function ModalCreateNote({ open, closeModal, create, error }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setContent("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    create({
      title,
      content,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Crear Nota </h2>

        <label>Título</label>
        <input
          type="text"
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Contenido</label>
        <textarea
          className="modal-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <div className="modal-buttons">
          <button className="modal-btn-create" onClick={handleSubmit}>
            Crear
          </button>

          <button className="modal-btn-cancel" onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
