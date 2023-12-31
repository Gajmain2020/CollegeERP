import mongoose from "mongoose";

const reqString = { type: String, required: true };

const examsSchema = mongoose.Schema({
  examName: reqString,
  examSession: reqString,
  examYear: reqString,
  examSemester: reqString,
  creatorId: reqString,
  creatorName: reqString,
  examType: reqString,
  formOpen: Boolean,
  examTimeTable: [{ examPriority: String, examDate: Date, examTime: String }],
  createdOn: { type: Date, defaultValue: new Date() },
});

export default mongoose.model("Exams", examsSchema);
