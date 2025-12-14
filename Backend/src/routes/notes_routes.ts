import { Router } from "express";
import note_controller from "../controllers/notes_controller";

const notes_router = Router();

notes_router.post("/create", note_controller.create);

notes_router.get("/", note_controller.getActiveNotes);

notes_router.get("/archived", note_controller.getArchivedNotes);

notes_router.get("/:note_id", note_controller.getById);

notes_router.put("/:note_id", note_controller.updateNote);

notes_router.delete("/:note_id", note_controller.deleteNote);

notes_router.patch("/:note_id/archive", note_controller.archiveNote);

notes_router.patch(
  "/archived/:note_id/unarchive",
  note_controller.unarchiveNote
);

notes_router.post("/:note_id/categories", note_controller.addCategory);

notes_router.delete("/:note_id/categories", note_controller.removeCat);

notes_router.get("/category/:id", note_controller.findByCat);
export default notes_router;
