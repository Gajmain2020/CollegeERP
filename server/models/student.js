import mongoose from "mongoose";
const reqString = { type: String, required: true };
const unqReqString = { type: String, required: true, unique: true };

const studentSchema = mongoose.Schema({
  name: reqString,
  email: unqReqString,
  password: reqString,
  semester: reqString,
  department: reqString,
  rollNumber: reqString,

  notification: [
    {
      noticeNumber: String,
      noticeSubject: String,
      seen: Boolean,
    },
  ],

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Student", studentSchema);
