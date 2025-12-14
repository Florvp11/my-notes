import { useEffect, useState } from "react";
import categories_services from "../services/categories_services";
import "./CategoriesScreen.css";
import { FaTrashAlt } from "react-icons/fa";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categories_services.getAllCategories();
      setCategories(res);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      await categories_services.createCategory({ name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categories_services.deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="categories-container">
      <h1>Categorías</h1>

      <div className="create-box">
        <input
          type="text"
          placeholder="Nueva categoría..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="create-btn"
          title="crear categoria"
          onClick={handleCreateCategory}
        >
          Crear
        </button>
      </div>

      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-item">
            <span>{cat.name}</span>

            <button
              className="delete-btn"
              title="Borrar categoria"
              onClick={() => handleDeleteCategory(cat.id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
