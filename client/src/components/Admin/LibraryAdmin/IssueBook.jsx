import {
  Alert,
  Backdrop,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { searchStudent } from "../../../services/student";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import {
  issueBooks,
  searchBookById,
  searchBookByName,
} from "../../../services/library";
import ViewIssueHistoryComponent from "./Helper/ViewIssueHistoryComponent";

export default function IssueBook() {
  const [issueBookBackdrop, setIssueBookBackdrop] = useState(false);
  const [disableSearch, setDisableSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hideSearchButton, setHideSearchButton] = useState(false);
  const [proceedClicked, setProceedClicked] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [bookData, setBookData] = useState(null);
  const [searchBookBackdrop, setSearchBookBackdrop] = useState(false);
  const [showBookData, setShowBookData] = useState(false);
  const [searchData, setSearchData] = useState({
    studentRollNumber: "",
    studentName: "",
  });
  const [studentData, setStudentData] = useState(null);
  const [searchBook, setSearchBook] = useState({
    bookName: "",
    bookId: "",
  });
  const [viewIssueHistory, setViewIssueHistory] = useState(false);

  useEffect(() => {
    document.title = "Issue Book";
  }, []);

  function handleSearchDataChange(e) {
    setSearchData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleIssueBookClick() {
    setIssueBookBackdrop(true);
  }
  function handleViewHistoryClick() {
    setViewIssueHistory(true);
  }

  function handleSearchStudent() {
    if (searchData.studentName === "" || searchData.studentRollNumber === "") {
      setErrorMessage("* Marked Are important.");
      return;
    }
    setDisableSearch(true);
    searchStudent(searchData)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setDisableSearch(false);
          return;
        }
        setHideSearchButton(true);
        setStudentData({
          name: searchData.studentName,
          rollNo: searchData.studentRollNumber,
          email: res.data.email,
          dept: res.data.dept,
          semester: res.data.semester,
        });
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setDisableSearch(false);
      });
  }

  function handleProceedClick() {
    setProceedClicked(true);
    setIssueBookBackdrop(false);
  }

  function handleBookSearchChange(e) {
    setSearchBook((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleBookSearchClick() {
    if (searchBook.bookId === "" && searchBook.bookName === "") {
      setErrorMessage("Please Enter Any One Field To Search Book.");
      return;
    }
    if (searchBook.bookId !== "") {
      searchBookById(searchBook.bookId).then((res) => {
        if (!res.successful) {
          setErrorMessage(res.message);
          return;
        }
        setBookData(res.book);
        setShowBookData(true);
      });
    }
    if (searchBook.bookName !== "" && searchBook.bookId === "") {
      searchBookByName(searchBook.bookName).then((res) => {
        if (!res.successful) {
          setErrorMessage(res.message);
        }
        setBookData(res.book);
        setShowBookData(true);
      });
    }
  }

  function BackdropForBookSearch() {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={searchBookBackdrop}
        className="test"
      >
        <div className="backdrop-element">
          <div className="backdrop-close-btn">
            <Button
              onClick={() => {
                setSearchBookBackdrop(false);
                setSearchBook({
                  bookName: "",
                  bookId: "",
                });
                setBookData(null);
                setShowBookData(false);
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
              onChange={handleBookSearchChange}
              value={bookData !== null ? bookData.bookId : searchBook.bookId}
              name="bookId"
              label="Book Id"
              disabled={bookData !== null}
            />
            {!showBookData && <span style={{ color: "black" }}>OR</span>}
            <TextField
              onChange={handleBookSearchChange}
              name="bookName"
              value={
                bookData !== null ? bookData.bookName : searchBook.bookName
              }
              disabled={bookData !== null}
              label="Book Name"
            />
            {showBookData && (
              <>
                <TextField
                  disabled
                  label="Book Author"
                  value={bookData.bookAuthor}
                />
                <TextField
                  disabled
                  label="Available Books"
                  value={bookData.availableNoOfBooks}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    for (let i = 0; i < selectedBooks.length; i++) {
                      if (selectedBooks[i].bookId === bookData.bookId) {
                        setErrorMessage(
                          `Book ${selectedBooks[i].bookName} is already selected.`
                        );
                        setBookData(null);
                        setSearchBookBackdrop(true);
                        setShowBookData(null);
                        setSearchBook({
                          bookName: "",
                          bookId: "",
                        });
                        return;
                      }
                    }
                    selectedBooks.push(bookData);
                    setBookData(null);
                    setSearchBookBackdrop(false);
                    setShowBookData(null);
                    setSearchBook({
                      bookName: "",
                      bookId: "",
                    });
                  }}
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setBookData(null);
                    setShowBookData(false);
                    setSearchBookBackdrop(true);
                    setSearchBook({
                      bookName: "",
                      bookId: "",
                    });
                  }}
                >
                  Remove
                </Button>
              </>
            )}
            {bookData === null && (
              <Button
                variant="contained"
                color="warning"
                onClick={handleBookSearchClick}
              >
                Search &nbsp; <SearchIcon fontSize="small" />
              </Button>
            )}
          </div>
        </div>
      </Backdrop>
    );
  }

  function renderRow(book, idx) {
    return (
      <TableRow key={book.bookId}>
        <TableCell>{idx + 1}</TableCell>
        <TableCell>{book.bookId}</TableCell>
        <TableCell>{book.bookName}</TableCell>
        <TableCell>{book.bookAuthor}</TableCell>
        <TableCell>{book.availableNoOfBooks}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
              const newArray = selectedBooks.filter(
                (book) => book.bookId !== selectedBooks[idx].bookId
              );
              setSelectedBooks(newArray);
            }}
            color="error"
            variant="contained"
            size="small"
          >
            <RemoveCircleTwoToneIcon fontSize="small" />
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  function handleIssueBookConfirm() {
    issueBooks(studentData, selectedBooks).then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
      }
      alert(res.message);
      setSelectedBooks([]);
    });
  }

  return (
    <>
      <m.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="homepage"
      >
        {errorMessage !== "" && (
          <Snackbar
            open={errorMessage !== ""}
            autoHideDuration={4000}
            onClose={() => setErrorMessage("")}
          >
            <Alert
              onClose={() => setErrorMessage("")}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        <div className="heading">
          <h1>Issue Book Module</h1>
          <span>Library Department Of BIT Durg</span>
        </div>
        <div className="button-container">
          <div className="button-row">
            <Button
              onClick={handleIssueBookClick}
              fullWidth
              variant="contained"
              disabled={viewIssueHistory || proceedClicked || issueBookBackdrop}
            >
              Issue Book
            </Button>
            <Button
              onClick={handleViewHistoryClick}
              fullWidth
              variant="contained"
              disabled={issueBookBackdrop || proceedClicked}
            >
              View Issue History
            </Button>
          </div>
        </div>
        {issueBookBackdrop && (
          <BackdropForStudentSearch
            {...{
              issueBookBackdrop,
              setIssueBookBackdrop,
              setStudentData,
              setHideSearchButton,
              setDisableSearch,
              searchData,
              handleSearchDataChange,
              hideSearchButton,
              handleSearchStudent,
              disableSearch,
              studentData,
              handleProceedClick,
            }}
          />
        )}
        {proceedClicked && (
          <m.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="issue-book-container"
          >
            <div className="close-modal-button">
              <Button
                onClick={() => {
                  setStudentData(null);
                  setSearchData({ studentName: "", studentRollNumber: "" });
                  setProceedClicked(false);
                }}
                variant="contained"
                color="error"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="student-data-container">
              <m.div whileHover={{ scale: 1.1 }} className="student-data">
                <span className="prefix">Roll Number</span>
                <span className="data">{studentData.rollNo}</span>
              </m.div>
              <m.div whileHover={{ scale: 1.1 }} className="student-data">
                <span className="prefix">Name</span>
                <span className="data">{studentData.name}</span>
              </m.div>
              <m.div whileHover={{ scale: 1.1 }} className="student-data">
                <span className="prefix">Email</span>
                <span className="data">{studentData.email}</span>
              </m.div>
              <m.div whileHover={{ scale: 1.1 }} className="student-data">
                <span className="prefix">Semester</span>
                <span className="data">{studentData.semester}</span>
              </m.div>
              <m.div whileHover={{ scale: 1.1 }} className="student-data">
                <span className="prefix">Department</span>
                <span className="data">{studentData.dept}</span>
              </m.div>
            </div>
            <div className="issue-books-table">
              <div className="add-book-button">
                <Button
                  variant="contained"
                  onClick={() => setSearchBookBackdrop(true)}
                  disabled={selectedBooks.length === 5}
                >
                  Add Book
                </Button>
              </div>
              {searchBookBackdrop && BackdropForBookSearch()}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S. No.</TableCell>
                      <TableCell>Book ID</TableCell>
                      <TableCell>Book Name</TableCell>
                      <TableCell>Book Author</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>

                  {selectedBooks.length === 0 ? (
                    <caption>
                      No Book Selected. <br /> Please Add Book From{" "}
                      <b>Add Book</b> Button.
                    </caption>
                  ) : (
                    <>
                      <TableBody>
                        {selectedBooks.map((book, idx) => renderRow(book, idx))}
                      </TableBody>
                    </>
                  )}
                </Table>
              </TableContainer>
              {selectedBooks.length !== 0 && (
                <div className="add-book-button">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleIssueBookConfirm}
                  >
                    Confirm
                  </Button>
                </div>
              )}
            </div>
          </m.div>
        )}
        {viewIssueHistory && (
          <ViewIssueHistoryComponent
            {...{ viewIssueHistory, setViewIssueHistory }}
          />
        )}
      </m.div>
    </>
  );
}

function BackdropForStudentSearch(props) {
  const {
    issueBookBackdrop,
    setIssueBookBackdrop,
    setStudentData,
    setHideSearchButton,
    setDisableSearch,
    searchData,
    handleSearchDataChange,
    hideSearchButton,
    handleSearchStudent,
    disableSearch,
    studentData,
    handleProceedClick,
  } = props;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={issueBookBackdrop}
    >
      <div className="backdrop-element">
        <div className="backdrop-close-btn">
          <Button
            onClick={() => {
              setIssueBookBackdrop(false);
              setStudentData(null);
              setHideSearchButton(false);
              setDisableSearch(false);
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
            onChange={handleSearchDataChange}
            name="studentRollNumber"
            label="Student Roll Number"
            value={searchData.studentRollNumber}
            type="number"
            required
          />
          <TextField
            onChange={handleSearchDataChange}
            name="studentName"
            value={searchData.studentName}
            label="Student Name"
            required
          />

          {!hideSearchButton && (
            <Button
              onClick={handleSearchStudent}
              variant="contained"
              color="warning"
              disabled={disableSearch}
            >
              Search &nbsp;
              <SearchIcon fontSize="small" />
            </Button>
          )}
          {hideSearchButton && studentData !== null && (
            <>
              <TextField disabled label="Email" value={studentData.email} />
              <TextField
                disabled
                label="Semester"
                value={studentData.semester}
              />
              <TextField disabled label="Department" value={studentData.dept} />
              <Button
                onClick={handleProceedClick}
                variant="contained"
                color="success"
              >
                Proceed
              </Button>
            </>
          )}
        </div>
      </div>
    </Backdrop>
  );
}
