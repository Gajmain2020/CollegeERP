const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const unqReqString = { type: String, required: true, unique: true };

const teacherSchema = mongoose.Schema({
  fullName: reqString,
  email: unqReqString,
  password: reqString,
  department: reqString,
  userId: reqString,

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model(Teacher, "teacherSchema");
