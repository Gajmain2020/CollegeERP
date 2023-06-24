import libraryBooks from "../models/libraryBooks.js";

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
      priceBook,
      noOfBook,
    });
    return res
      .status(200)
      .json({
        message: `Book with id ${bookId} added successfully`,
        successful: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
