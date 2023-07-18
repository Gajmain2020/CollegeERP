import libraryBooks from "../models/libraryBooks.js";
import libraryIssue from "../models/libraryIssue.js";
import students from "../models/student.js";

export const addSingleBook = async (req, res) => {
  try {
    const { bookName, bookAuthor, bookId, priceBook, noOfBook } = req.body;
    var isBookExisting = await libraryBooks.findOne({ bookId });
    if (isBookExisting) {
      return res
        .status(401)
        .json({ message: `Book ${bookId} already exists`, successful: false });
    }
    libraryBooks.create({
      bookName,
      bookAuthor,
      bookId,
      availableNoOfBooks: noOfBook,
      priceBook,
      noOfBook,
    });
    return res.status(200).json({
      message: `Book with id ${bookId} added successfully`,
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const addMultipleBooks = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const books = req.body;

    for (let i = 0; i < books.length; i++) {
      const { bookId, bookName, bookAuthor, noOfBook, priceBook } = books[i];

      const bookAlreadyAdded = await libraryBooks.findOne({ bookId });
      if (bookAlreadyAdded) {
        rejected.push(books[i]);
        continue;
      }
      await libraryBooks.create({
        bookName,
        bookId,
        bookAuthor,
        availableNoOfBooks: noOfBook,
        priceBook,
        noOfBook,
        availableNoOfBooks: noOfBook,
      });
      added.push(books[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: "Books Added Successfully",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await libraryBooks.find();

    return res.status(200).json({
      books,
      successful: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    await libraryBooks.findOneAndRemove({ bookId });

    const books = await libraryBooks.find();

    return res.status(200).json({
      message: "Book Deleted successfully",
      books,
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const editBook = async (req, res) => {
  try {
    const id = req.query.bookId;
    const book = req.body;
    await libraryBooks.findByIdAndUpdate(id, book);
    return res
      .status(200)
      .json({ successful: true, message: "Book Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const searchBook = async (req, res) => {
  try {
    const bookId = req.query?.bookId;
    const bookName = req.query?.bookName;
    if (bookId) {
      const book = await libraryBooks.findOne({ bookId });
      if (!book) {
        return res.status(404).json({
          message: `No book with ID '${bookId}' found.`,
          successful: false,
        });
      }
      return res.status(200).json({ successful: true, book });
    }

    if (bookName) {
      const book = await libraryBooks.findOne({ bookName });
      if (!book) {
        return res.status(404).json({
          message: `No book with name '${bookName}' found.`,
          successful: false,
        });
      }
      return res.status(200).json({ successful: true, book });
    }
    return res.status(404).json({
      message: `Book Searched Is Not Found... Please Try Again.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const issueBooks = async (req, res) => {
  try {
    const { studentData, selectedBooks } = req.body;
    const student = await students.findOne({ rollNo: studentData.rollNo });

    for (let i = 0; i < selectedBooks.length; i++) {
      const book = await libraryBooks.findById(selectedBooks[i]._id);
      book.availableNoOfBooks = book.availableNoOfBooks - 1;
      book.issuedTo.push({
        studentName: student.name,
        studentRollNumber: student.rollNo,
        issuedOn: new Date(),
      });
      book.save();
    }

    const studentInIssueBook = await libraryIssue.findOne({
      studentRollNumber: student.rollNo,
    });

    if (!studentInIssueBook) {
      const booksOrganized = [];

      for (let i = 0; i < selectedBooks.length; i++) {
        booksOrganized.push({
          bookName: selectedBooks[i].bookName,
          bookId: selectedBooks[i].bookId,
          issuedOn: new Date(),
        });
      }

      libraryIssue.create({
        studentName: student.name,
        studentRollNumber: student.rollNo,
        semester: student.semester,
        department: student.department,
        currentIssuedBooks: booksOrganized,
      });

      return res
        .status(200)
        .json({ message: "Books Issued Successfully.", successful: true });
    } else {
      for (let i = 0; i < selectedBooks.length; i++) {
        studentInIssueBook.currentIssuedBooks.push({
          bookName: selectedBooks[i].bookName,
          bookId: selectedBooks[i].bookId,
          issuedOn: new Date(),
        });
      }
      studentInIssueBook.save();
      return res
        .status(200)
        .json({ message: "Books Issued Successfully.", successful: true });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: false });
  }
};

export const returnBooks = async (req, res) => {
  try {
    const { selectedBooks, studentData } = req.body;

    for (let i = 0; i < selectedBooks.length; i++) {
      const book = await libraryBooks.findOne({
        bookId: selectedBooks[i].bookId,
      });
      for (let j = 0; j < book.issuedTo; j++) {
        if (book.issuedTo[j].studentRollNumber === studentData.rollNo) {
          book.pastIssuedTo.push({
            studentRollNumber: studentData.roll,
            studentName: studentData.name,
            issuedOn: book.issuedTo[j].issuedOn,
            returnedOn: new Date(),
          });
          book.availableNoOfBooks += 1;
          book.issuedTo.splice(j, 1);
        }
      }
      book.save();
    }
    const studentOnIssueRecord = await libraryIssue.findOne({
      studentRollNumber: studentData.rollNo,
    });

    for (let i = 0; i < studentOnIssueRecord.currentIssuedBooks.length; i++) {
      console.log(studentOnIssueRecord.currentIssuedBooks[i]);
      for (let j = 0; j < selectedBooks.length; j++) {
        if (
          studentOnIssueRecord.currentIssuedBooks[i].bookId ===
          selectedBooks[j].bookId
        ) {
          studentOnIssueRecord.allIssuedBooks.push({
            bookId: studentOnIssueRecord.currentIssuedBooks[i].bookId,
            bookName: studentOnIssueRecord.currentIssuedBooks[i].bookName,
            issuedDate: studentOnIssueRecord.currentIssuedBooks[i].issuedOn,
            returnDate: new Date(),
          });
          studentOnIssueRecord.currentIssuedBooks.splice(i, 1);

          studentOnIssueRecord.save();
        }
        console.log("book issue wala bhi kaam ho gaya");
      }
    }
    return res.status(200).json({
      message: "Books Received Succefully",
      successful: true,
      issuedBooks: studentOnIssueRecord.currentIssuedBooks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: false });
  }
};
