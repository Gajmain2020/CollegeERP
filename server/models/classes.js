import mongoose from "mongoose";

const reqString = { type: String, required: true };

const classesSchema = mongoose.Schema({
  semester: reqString,
  section: reqString,
  teacherId: reqString,
  teacherName: reqString,
  courseCode: reqString,
  courseName: reqString,
});

export default mongoose.model(Classes, "classesSchema");
