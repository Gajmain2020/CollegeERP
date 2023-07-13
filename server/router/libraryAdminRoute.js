import express from "express";
import {
  addSingleBook,
  addMultipleBooks,
  fetchBooks,
  deleteBook,
  editBook,
} from "../controllers/libraryAdminControls.js";

const router = express.Router();

router.get("/fetch-books", fetchBooks);
router.post("/add-single-book", addSingleBook);
router.post("/add-multiple-books", addMultipleBooks);
router.post("/add-multiple-books", addMultipleBooks);
router.delete("/delete-book", deleteBook);
router.patch("/edit-book", editBook);

export default router;
