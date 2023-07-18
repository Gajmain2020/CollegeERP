import express from "express";

import {
  addIndividualStudent,
  searchStudent,
  fetchIssuedBooks,
} from "../controllers/studentControls.js";

const router = express.Router();

router.get("/search-student", searchStudent);
router.get("/fetch-books", fetchIssuedBooks);
router.post("/addIndividualStudent", addIndividualStudent);

export default router;
