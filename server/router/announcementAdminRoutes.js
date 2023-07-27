import express from "express";
import {
  draftAnnouncement,
  publishAnnouncement,
  fetchDraftedAnnouncements,
  publishEditedAnnouncement,
  publishDraftAnnouncement,
  fetchAllAnnouncements,
  deleteAnnoucement,
} from "../controllers/announcementControls.js";

const router = express.Router();

router.get("/fetch-all-drafted-announcements", fetchDraftedAnnouncements);
router.get("/fetch-all-announcements", fetchAllAnnouncements);
router.post("/draft-announcement", draftAnnouncement);
router.post("/publish-announcement", publishAnnouncement);
router.patch("/publish-edited-announcement", publishEditedAnnouncement);
router.patch("/publish-draft-announcement", publishDraftAnnouncement);
router.delete("/delete-announcement", deleteAnnoucement);

export default router;
