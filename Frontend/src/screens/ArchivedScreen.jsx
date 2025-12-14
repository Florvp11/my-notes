import { useEffect, useState } from "react";
import notes_services from "../services/notes_services";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";

export default function ArchivedScreen() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notes_services.getArchivedNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error al cargar notas archivadas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Cargando..</h2>
      ) : notes.length === 0 ? (
        <div className="no-notes">
          <p>No hay notas archivadas.</p>
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
    </>
  );
}
