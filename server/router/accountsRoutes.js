import express from "express";
import {
  releaseFeeNotice,
  searchByFilter,
  sendRemainderToStudent,
  uploadFeeStructure,
} from "../controllers/accountsController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/fee-structure");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/search-students-by-filter", searchByFilter);
router.post("/upload-fee-structure", upload.single("file"), uploadFeeStructure);
router.post("/release-fee-notice", releaseFeeNotice);
router.patch("/send-remainder-to-student", sendRemainderToStudent);

export default router;
