import express from "express";
import {
  getAllFaculties,
  addIndividualFaculty,
  addMultipleFaculties,
  updateSingleFaculty,
  deleteSingleFaculty,
  deleteMultipleFaculties,
} from "../controllers/facultyController.js";

const router = express.Router();

router.get("/get-all-faculties", getAllFaculties);
router.post("/add-individual-faculty", addIndividualFaculty);
router.post("/add-multiple-faculties", addMultipleFaculties);
router.patch("/update-single-faculty", updateSingleFaculty);
router.delete("/delete-multiple-faculties", deleteMultipleFaculties);
router.delete("/delete-single-faculty", deleteSingleFaculty);

export default router;
