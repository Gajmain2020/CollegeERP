import mongoose from "mongoose";

const reqString = { type: String, required: true };

const adminSchema = mongoose.Schema({
  name: reqString,
  department: reqString,
  email: reqString,
  password: reqString,
  phoneNo: reqString,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export default mongoose.model("Admin", adminSchema);
