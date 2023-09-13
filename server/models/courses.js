import mongoose from "mongoose";
const reqString = { type: String, required: true };

const coursesSchema = mongoose.Schema({
  department: reqString,
  courses: [
    {
      courseName: String,
      courseCode: String,
      semester: String,
      courseType: String,
    },
  ],
});

export default mongoose.model("Course", coursesSchema);
