import mongoose from "mongoose";

const reqString = { type: String, required: true };

const libraryBookSchema = mongoose.Schema({
  bookId: reqString,
  bookName: reqString,
  bookAuthor: reqString,
  TotalNoOfBooks: reqString,
  issuedTo: [{ studentName: reqString, studentId: reqString }],
});

export default mongoose.model("LibraryBook", libraryBookSchema);
