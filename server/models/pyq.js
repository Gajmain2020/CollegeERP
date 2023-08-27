import mongoose from "mongoose";

const reqString = { type: String, required: true };

const pyqSchema = mongoose.Schema({
  fileName: reqString,
  subjectCode: reqString,
  examYear: reqString,
  filePath: reqString,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("PYQ", pyqSchema);
