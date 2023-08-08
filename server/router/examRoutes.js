import express from "express";
import {
  newExamFormRelease,
  searchExamForm,
} from "../controllers/examControls.js";

const router = express.Router();

router.get("/search-exam-form", searchExamForm);
router.post("/new-exam-form-release", newExamFormRelease);

export default router;
