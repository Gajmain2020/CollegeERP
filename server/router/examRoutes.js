import express from "express";
import multer from "multer";
import {
  newExamFormRelease,
  searchExamForm,
  publishExamTimeTable,
  uploadPYQ,
} from "../controllers/examControls.js";

const router = express.Router();

// storage solution for uploading pdf files to storage area
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/search-exam-form", searchExamForm);
router.post("/upload-pyq-pdf", upload.single("file"), uploadPYQ);
router.post("/new-exam-form-release", newExamFormRelease);
router.post("/publish-exam-time-table", publishExamTimeTable);

export default router;
