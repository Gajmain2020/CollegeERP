import { useEffect, useState } from "react";
import { checkForToken, decodeToken } from "../../../services/common";
import { useNavigate } from "react-router-dom";
import { bookUpdate, deleteBook, fetchBooks } from "../../../services/library";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TableBody,
  TextField,
  Snackbar,
  Alert,
  Backdrop,
  InputAdornment,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";

export default function EditBooks() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [books, setBooks] = useState(null);
  const [allBooks, setAllBooks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showClearFilterButton, setShowClearFilterButton] = useState(false);
  const [searchData, setSearchData] = useState({
    bookId: "",
    bookName: "",
    bookAuthor: "",
  });
  const [openEditBackdrop, setOpenEditBackdrop] = useState(false);
  const [bookEdit, setBookEdit] = useState(null);
  const [disableMakeChangeButton, setDisableMakeChangeButton] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  setTimeout(() => {
    setSuccessMessage("");
  }, 4000);

  useEffect(() => {
    checkForToken()
      .then((res) => {
        if (res.tokenExists === false) {
          navigate("/");
        }
        return res;
      })
      .then((res) => {
        decodeToken(res.token);
      })
      .then((res) => setUserDetails(res))
      .then((res) => {
        return fetchBooks();
      })
      .then((res) => {
        setBooks(res.books);
        setAllBooks(res.books);
        setTotalItems(res.books.length);
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, [navigate, totalPages, itemsPerPage, totalItems]);

  //! UTILITIES FOR PAGINATION BUTTONS
  function handleNextClick() {
    if (currentPage === totalPages) return;
    setCurrentPage((idx) => idx + 1);
  }
  function handlePrevClick() {
    if (currentPage === 1) return;
    setCurrentPage((idx) => idx - 1);
  }
  function renderButtons() {
    const button = [];
    for (let i = 1; i <= totalPages; i++) {
      button.push(
        <Button
          size="small"
          variant={i !== currentPage ? "outlined" : "contained"}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      );
    }
    return button;
  }

  //! SINGLE BOOK DELETE FUNCTION
  async function handleDeleteBook(id) {
    const response = window.confirm(`Are you sure you want to delete?`);
    if (response === false) return;
    deleteBook(id)
      .then((res) => {
        return fetchBooks();
      })
      .then((res) => {
        setSuccessMessage("Book Deleted Successfully!!");
        setBooks(res.books);
        setAllBooks(res.books);
        setTotalItems(res.books.length);
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      });
  }

  async function handleEditBook() {
    books[editIndex] = bookEdit;
    const response = await bookUpdate(bookEdit);
    if (response.successful === false)
      alert("Something went wrong please try again.");
    else {
      setSuccessMessage(response.message);
      setOpenEditBackdrop(false);
      setBookEdit(null);
      setEditIndex(-1);
    }
    console.log(response);
  }

  function handleToggleBookEdit(book, idx) {
    setBookEdit(book);
    setOpenEditBackdrop(true);
    setEditIndex(idx);
  }

  function renderRow(book, idx) {
    return (
      <>
        <TableRow hover>
          <TableCell>{idx + 1}</TableCell>
          <TableCell>{book.bookName}</TableCell>
          <TableCell>{book.bookId}</TableCell>
          <TableCell>{book.bookAuthor}</TableCell>
          <TableCell>{book.noOfBook}</TableCell>
          <TableCell>{book.priceBook}</TableCell>
          <TableCell>
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={() => {
                handleToggleBookEdit(book, idx);
              }}
            >
              <ModeEditOutlineIcon fontSize="small" />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => handleDeleteBook(book.bookId)}
            >
              <DeleteForeverIcon fontSize="small" />
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  }

  //! handle searching element to work well
  //* need to work on useEffect for fetching and using it to set total pages
  function handleSearch() {
    console.log(searchData);
    const filterBook = books.filter((book) =>
      book.bookName.includes(searchData.bookName)
    );
    console.table(filterBook);
    setBooks(filterBook);
    setTotalItems(filterBook.length);
    setTotalPages(filterBook.length / itemsPerPage);
  }

  function handleSearchChange(e) {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
    if (
      searchData.bookId !== "" ||
      searchData.bookName !== "" ||
      searchData.bookAuthor !== ""
    ) {
      setShowClearFilterButton(true);
    }
  }

  function handleClearSearch() {
    setSearchData({
      bookName: "",
      bookAuthor: "",
      bookId: "",
    });
    setBooks(allBooks);
    setTotalItems(allBooks.length);
    setTotalPages(allBooks.length / itemsPerPage);
  }

  function handleBookEditChange(e) {
    setBookEdit({ ...bookEdit, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {/*! Success Snack Bar */}
      <Snackbar
        open={successMessage !== ""}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* BACKDROP TO EDIT BOOK!! */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openEditBackdrop}
      >
        {bookEdit !== null && (
          <div className="backdrop-element">
            <div className="backdrop-close-btn">
              <Button
                onClick={() => {
                  setBookEdit(null);
                  setOpenEditBackdrop(false);
                }}
                variant="contained"
                color="error"
                size="small"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="backdrop-options-column">
              <TextField
                onChange={handleBookEditChange}
                value={bookEdit.bookName}
                label="Book Name"
                name="bookName"
                fullWidth
              />
              <TextField
                onChange={handleBookEditChange}
                value={bookEdit.bookId}
                label="Book ID"
                name="bookId"
                fullWidth
              />

              <TextField
                onChange={handleBookEditChange}
                value={bookEdit.bookAuthor}
                label="Author Name"
                name="bookAuthor"
              />
              <TextField
                onChange={handleBookEditChange}
                value={bookEdit.noOfBook}
                label="Nos. Of Books"
                name="noOfBook"
                type="number"
              />
              <TextField
                onChange={handleBookEditChange}
                value={bookEdit.priceBook}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹ </InputAdornment>
                  ),
                }}
                label="Price Of Single Book"
                name="priceBook"
                type="number"
              />
              <Button
                onClick={handleEditBook}
                disabled={disableMakeChangeButton}
                variant="contained"
                color="warning"
                size="large"
              >
                Make Changes
              </Button>
            </div>
          </div>
        )}
      </Backdrop>

      {books !== null && (
        <div className="edit-book-container">
          <Paper elevation={6} className="search-component">
            <TextField
              onChange={handleSearchChange}
              size="small"
              label="Book ID"
              name="bookId"
              value={searchData.bookId}
            />
            <TextField
              onChange={handleSearchChange}
              size="small"
              label="Book Name"
              name="bookName"
              value={searchData.bookName}
            />
            <TextField
              onChange={handleSearchChange}
              size="small"
              label="Book Author"
              name="bookAuthor"
              value={searchData.bookAuthor}
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              size="small"
              color="success"
            >
              Search
            </Button>
            <Button
              onClick={handleClearSearch}
              hidden={showClearFilterButton}
              variant="contained"
              size="small"
              color="warning"
            >
              Clear
            </Button>
          </Paper>
          <div className="title">Edit Or Remove Book</div>
          <div className="books">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead sx={{ backgroundColor: "#606C5D " }}>
                  <TableRow>
                    <TableCell>S. No.</TableCell>
                    <TableCell>Book Name</TableCell>
                    <TableCell>Book ID</TableCell>
                    <TableCell>Book Author</TableCell>
                    <TableCell>Nos Of Total Books</TableCell>
                    <TableCell>Price/Book</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book, idx) => renderRow(book, idx))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="pages-button">
            {totalPages !== 1 && (
              <Button
                size="small"
                disabled={currentPage === 1}
                className="next-prev"
                onClick={handlePrevClick}
              >
                Prev
              </Button>
            )}
            {renderButtons()}
            {totalPages !== 1 && (
              <Button
                size="small"
                className="next-prev"
                disabled={currentPage === totalPages}
                onClick={handleNextClick}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
