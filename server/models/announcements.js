import mongoose from "mongoose";

const reqString = { type: String, required: true };

const announcementSchema = mongoose.Schema({
  announcementNumber: reqString,
  announcementDraftDate: { type: Date, default: new Date() },
  announcementPublishDate: Date,
  announcementTitle: reqString,
  announcementDepartment: reqString,
  announcementSubject: reqString,
  announcementText: reqString,
  published: Boolean,
  creatorName: reqString,
  creatorId: reqString,
});

export default mongoose.model("Announcements", announcementSchema);
