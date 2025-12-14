import { API_URL } from "./config";

class CategoriesService {
  async createCategory(data) {
    try {
      const res = await fetch(`${API_URL}/categories/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.error("Error al crear categoria:", error);
      throw error;
    }
  }

  async deleteCategory(category_id) {
    try {
      const res = await fetch(`${API_URL}/categories/${category_id}`, {
        method: "DELETE",
      });

      if (res.status === 204) return true;

      const text = await res.text();
      return text ? JSON.parse(text) : true;
    } catch (error) {
      console.error("Error borrando categoria :", error);
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error al cargar categorias :", error);
      throw error;
    }
  }
}

export default new CategoriesService();
