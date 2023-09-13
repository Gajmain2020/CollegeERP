import express from "express";
import {
  addCourse,
  getAllCourse,
  updateSingleCourse,
  deleteSingleCourse,
  uploadSyllabus,
} from "../controllers/courseControls.js";
import multer from "multer";
const router = express.Router();

// adding file to backend
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/syllabus");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/get-all-course", getAllCourse);
router.post("/add-course", addCourse);
router.post("/upload-syllabus", upload.single("file"), uploadSyllabus);
router.patch("/update-single-course", updateSingleCourse);
router.delete("/delete-single-course", deleteSingleCourse);

export default router;
