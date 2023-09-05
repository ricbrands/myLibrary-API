import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorController.authorsList)
  .get("/authors/:id", AuthorController.authorListById)
  .post("/authors", AuthorController.createAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export default router;