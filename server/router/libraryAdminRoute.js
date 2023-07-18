import express from "express";
import {
  addSingleBook,
  addMultipleBooks,
  fetchBooks,
  deleteBook,
  editBook,
  searchBook,
  issueBooks,
  returnBooks,
} from "../controllers/libraryAdminControls.js";

const router = express.Router();

router.get("/fetch-books", fetchBooks);
router.get("/search-book", searchBook);
router.post("/add-single-book", addSingleBook);
router.post("/add-multiple-books", addMultipleBooks);
router.post("/add-multiple-books", addMultipleBooks);
router.post("/issue-books", issueBooks);
router.delete("/delete-book", deleteBook);
router.patch("/edit-book", editBook);
router.patch("/return-books", returnBooks);

export default router;
