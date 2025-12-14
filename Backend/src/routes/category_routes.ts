import { Router } from "express";
import category_controller from "../controllers/category_controller";

const category_router = Router();

category_router.post("/create", category_controller.create);

category_router.get("/", category_controller.getAll);

category_router.get("/:id", category_controller.getById);

category_router.delete("/:id", category_controller.deleteCategory);

export default category_router;
