import express from "express";
import { addSingleBook } from "../controllers/libraryAdminControls.js";

const router = express.Router();

router.post("/add-single-book", addSingleBook);

export default router;
