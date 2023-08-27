import express from "express";

import {
  addIndividualStudent,
  searchStudent,
  fetchIssuedBooks,
  addMultipleStudents,
  fetchAllStudents,
  updateMultipleStudents,
  deleteMultipleStudents,
  deleteSingleStudent,
  updateSingleStudent,
} from "../controllers/studentControls.js";

const router = express.Router();

router.get("/search-student", searchStudent);
router.get("/get-all-students", fetchAllStudents);
router.get("/fetch-books", fetchIssuedBooks);
router.post("/add-individual-student", addIndividualStudent);
router.post("/add-multiple-students", addMultipleStudents);
router.patch("/update-single-student", updateSingleStudent);
router.patch("/update-multiple-students", updateMultipleStudents);
router.delete("/delete-single-student", deleteSingleStudent);
router.delete("/delete-multiple-students", deleteMultipleStudents);

export default router;
