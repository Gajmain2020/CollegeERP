import mongoose from "mongoose";

const reqString = { type: String, required: true };

const libraryIssueSchema = mongoose.Schema({
  studentId: reqString,
  studentName: reqString,
  studentRollNo: reqString,
  department: reqString,
  fine: { type: Number, defaultValue: 0 },
  currentIssueBook: [
    {
      type: String,
      bookName: String,
      bookId: String,
      issueData: Date,
    },
  ],
  issueedBooks: [
    {
      type: String,
      bookName: String,
      bookId: String,
      issueData: Date,
      returnDate: Date,
    },
  ],
});

export default mongoose.model(LibraryStudent, "libraryIssueSchema");
