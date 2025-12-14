import express from "express";
import cors from "cors";
import notes_router from "./routes/notes_routes";
import category_router from "./routes/category_routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/notes", notes_router);
app.use("/api/categories", category_router);

export default app;
