import mongoose from "mongoose";
const reqString = { type: String, required: true };
const unqReqString = { type: String, required: true, unique: true };

const facultySchema = mongoose.Schema({
  name: reqString,
  email: unqReqString,
  password: reqString,
  department: reqString,
  empId: reqString,

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Faculty", facultySchema);
