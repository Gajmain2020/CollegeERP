import express from "express";

import {
  loginAdmin,
  signUpAdmin,
  getDetails,
  updateAdmin,
} from "../controllers/adminControls.js";

const router = express.Router();

router.get("/get-details/:id", getDetails);
router.post("/sign-up", signUpAdmin);
router.post("/login-admin", loginAdmin);
router.patch("/update-user", updateAdmin);

export default router;
