import { Request, Response } from "express";
import category_service from "../services/category_service";

class CategoryController {
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const category_created = await category_service.createCategory(name);

      return res.status(201).json(category_created);
    } catch (error: any) {
      return res
        .status(error.status || 500)
        .json({ error: error.message || "Error al crear la categoria" });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await category_service.getAllCategories();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json("Error al cargar categorias");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const category = await category_service.getCategoryById(id);
      return res.json(category);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await category_service.deleteCategory(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
}

const category_controller = new CategoryController();
export default category_controller;
