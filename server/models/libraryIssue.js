import mongoose from "mongoose";

const reqString = { type: String, required: true };

const libraryIssueToStudentSchema = mongoose.Schema({
  studentName: reqString,
  studentRollNumber: reqString,
  semester: reqString,
  department: reqString,
  fine: { type: Number, defaultValue: 0 },
  currentIssuedBooks: [
    {
      bookName: String,
      bookId: String,
      issuedOn: { type: Date, defaultValue: new Date() },
    },
  ],
  allIssuedBooks: [
    {
      bookName: String,
      bookId: String,
      issueData: { type: Date, defaultValue: new Date() },
      returnDate: Date,
    },
  ],
});

export default mongoose.model(
  "LibraryIssueToStudent",
  libraryIssueToStudentSchema
);
