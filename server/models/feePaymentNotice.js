import mongoose from "mongoose";

const reqString = { type: String, required: true };

const feeNotice = mongoose.Schema({
  noticeNumber: reqString,
  semester: reqString,
  session: reqString,
  published: Boolean,
  createdOn: { type: Date, defaultValue: new Date() },
});

export default mongoose.model("FeeNotice", feeNotice);
