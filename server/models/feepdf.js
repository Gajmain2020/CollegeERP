import mongoose from "mongoose";

const reqString = { type: String, requireq: true };

const feeSchema = mongoose.Schema({
  fileName: reqString,
  filePath: reqString,
  session: reqString,
  uploadDate: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("FeeStructure", feeSchema);
