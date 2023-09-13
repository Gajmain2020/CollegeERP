import mongoose from "mongoose";

const reqString = { type: String, required: true };

const syllabusSchema = mongoose.Schema({
  department: reqString,
  syllabus: [
    {
      fileName: reqString,
      filePath: reqString,
      semester: reqString,
      createdAt: { type: Date, default: new Date() },
      updatedAt: { type: Date, default: new Date() },
    },
  ],
});

export default mongoose.model("Syllabus", syllabusSchema);
