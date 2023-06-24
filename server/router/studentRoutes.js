import express from "express";

import { addIndividualStudent } from "../controllers/studentControls.js";

const router = express.Router();

router.post("/addIndividualStudent", addIndividualStudent);

export default router;
