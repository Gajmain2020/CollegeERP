import express from "express";
import {
  releaseFeeNotice,
  searchByFilter,
} from "../controllers/accountsController.js";

const router = express.Router();

router.get("/search-students-by-filter", searchByFilter);
router.post("/release-fee-notice", releaseFeeNotice);

export default router;
