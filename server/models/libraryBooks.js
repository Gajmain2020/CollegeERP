import mongoose from "mongoose";

const reqString = { type: String, required: true };

const libraryBookSchema = mongoose.Schema({
  bookId: reqString,
  bookName: reqString,
  bookAuthor: reqString,
  noOfBook: reqString,
  availableNoOfBooks: String,
  priceBook: reqString,
  issuedTo: [{ studentName: reqString, studentId: reqString }],
  createdAt: { type: Date, defaultValue: new Date() },
  updatedAt: { type: Date, defaultValue: new Date() },
});

export default mongoose.model("LibraryBook", libraryBookSchema);
