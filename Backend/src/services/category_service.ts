import category_repository from "../repositories/category_repository";
import note_repository from "../repositories/note_repository";

class CategoryService {
  private category_repository = category_repository;

  async createCategory(name: string) {
    return this.category_repository.create(name);
  }

  async getAllCategories() {
    return this.category_repository.findAll();
  }

  async getCategoryById(category_id: number) {
    const category = await this.category_repository.findById(category_id);
    if (!category) throw new Error("Categoría no encontrada");
    return category;
  }

  async deleteCategory(category_id: number) {
    await this.getCategoryById(category_id);
    return this.category_repository.delete(category_id);
  }
}

const category_service = new CategoryService();
export default category_service;
