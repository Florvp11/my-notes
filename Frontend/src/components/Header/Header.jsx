import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({ onCreate }) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <nav className="nav">
        <button
          onClick={() => navigate("/")}
          title="Inicio"
          className="btn-home"
        >
          Mis Notas
        </button>
        <button
          onClick={() => navigate("/archived")}
          title="Notas Archivadas"
          className="btn"
        >
          Archivadas
        </button>
        <button onClick={() => navigate("/categories")} className="btn">
          Categorias
        </button>
      </nav>
    </header>
  );
}
