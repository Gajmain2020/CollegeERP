import {
  Alert,
  Button,
  Checkbox,
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
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchIssuedBooks, searchStudent } from "../../../services/student";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { motion as m } from "framer-motion";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import { differenceInDays, format } from "date-fns";
import { returnBooks } from "../../../services/library";

export default function ReturnBooks() {
  const [errorMessage, setErrorMessage] = useState("");
  const [searchData, setSearchData] = useState({
    studentRollNumber: "",
  });
  const [hideSearchButton, setHideSearchButton] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [disableSearch, setDisableSearch] = useState(false);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  function handleSearchDataChange(e) {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  }
  function handleSearchStudent() {
    setDisableSearch(true);
    if (searchData.studentRollNumber === "" || searchData === null) {
      setErrorMessage("* Marked Are Mandatory.");
      setDisableSearch(false);
      return;
    }
    searchStudent(searchData)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setDisableSearch(false);
          return;
        }
        setStudentData(res.data);
        setHideSearchButton(true);
      })
      .catch((err) => setErrorMessage(err.message));
  }

  function handleProceedClick() {
    fetchIssuedBooks(studentData.rollNo)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
        }
        setIssuedBooks(res.data.currentIssuedBooks);
      })
      .catch((err) => setErrorMessage(err.message));
  }

  function handleReject() {
    setStudentData(null);
    setSearchData({
      studentRollNumber: "",
    });
    setErrorMessage("");
    setHideSearchButton(false);
    setDisableSearch(false);
  }
  function showDate(issuedOn) {
    return format(new Date(issuedOn), "dd-MM-yyyy");
  }
  function showDateDifference(issuedOn) {
    return differenceInDays(new Date(), new Date(issuedOn));
  }
  function handleSelectBook(e, book) {
    if (e.target.checked) {
      //select that book
      selectedBooks.push(book);
    }
    if (e.target.checked === false) {
      const newArray = selectedBooks.filter(
        (item) => item.bookId !== book.bookId
      );
      setSelectedBooks([...newArray]);
    }
  }

  function handelReturnBook() {
    setApiCalled(true);
    if (selectedBooks.length === 0) {
      alert("Please select a book to return.");
      setApiCalled(false);
      return;
    }

    returnBooks(selectedBooks, studentData)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setApiCalled(false);
          return;
        }
        console.log(res);
        setIssuedBooks(res.issuedBooks);
        alert("Books Returned Successfully");
        setApiCalled(false);
      })
      .catch((err) => {
        setApiCalled(false);
        setErrorMessage("");
      });
  }

  return (
    <>
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
      <div className="homepage">
        <div className="heading">
          <h1>Return Book Module</h1>
          <span>Library Department Of BIT Durg</span>
        </div>
        {issuedBooks.length === 0 ? (
          <div>
            <div className="return-container">
              <div className="return-container-search">
                <TextField
                  onChange={handleSearchDataChange}
                  name="studentRollNumber"
                  label="Student Roll Number"
                  value={searchData.studentRollNumber}
                  type="number"
                  fullWidth
                  required
                />

                {!hideSearchButton && (
                  <Button
                    onClick={handleSearchStudent}
                    variant="contained"
                    color="warning"
                    disabled={disableSearch}
                    fullWidth
                    size="large"
                  >
                    {disableSearch ? (
                      <>
                        <HourglassTopTwoToneIcon />
                      </>
                    ) : (
                      <>
                        Search &nbsp;
                        <SearchIcon fontSize="small" />
                      </>
                    )}
                  </Button>
                )}
                {hideSearchButton && studentData !== null && (
                  <>
                    <TextField disabled label="Name" value={studentData.name} />
                    <TextField
                      disabled
                      label="Email"
                      value={studentData.email}
                    />
                    <TextField
                      disabled
                      label="Semester"
                      value={studentData.semester}
                    />
                    <TextField
                      disabled
                      label="Department"
                      value={studentData.department}
                    />

                    <div className="option-row">
                      <Button
                        onClick={handleReject}
                        variant="contained"
                        color="warning"
                        size="small"
                        fullWidth
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleProceedClick}
                        variant="contained"
                        color="success"
                        size="large"
                        fullWidth
                      >
                        Proceed
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="return-books-table">
            <div
              className="modal-close-button"
              style={{ padding: "0", margin: "0" }}
            >
              <Button
                onClick={() => {
                  setStudentData(null);
                  setSearchData({ studentRollNumber: "" });
                  setHideSearchButton(false);
                  setIssuedBooks([]);
                  setDisableSearch(false);
                  setSelectedBooks([]);
                }}
                variant="contained"
                color="error"
              >
                <CloseTwoToneIcon />
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
                <span className="data">{studentData.department}</span>
              </m.div>
            </div>
            <div className="issue-books-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>S. No.</TableCell>
                      <TableCell>Book ID</TableCell>
                      <TableCell>Book Name</TableCell>
                      <TableCell>Issued On</TableCell>
                      <TableCell>No Of Days</TableCell>
                      <TableCell>Fine</TableCell>
                      <TableCell>Select</TableCell>
                    </TableRow>
                  </TableHead>

                  {issuedBooks.length === 0 ? (
                    <caption>
                      You have no books issued for the time being.
                    </caption>
                  ) : (
                    <>
                      <TableBody>
                        {issuedBooks.map((book, idx) => (
                          <>
                            <TableRow key={book._id}>
                              <TableCell>{idx + 1}</TableCell>
                              <TableCell>{book.bookId}</TableCell>
                              <TableCell>{book.bookName}</TableCell>
                              <TableCell>{showDate(book.issuedOn)}</TableCell>
                              <TableCell>
                                {showDateDifference(book.issuedOn)}
                              </TableCell>
                              <TableCell>
                                {showDateDifference(book.issuedOn) > 15
                                  ? showDateDifference(book.issuedOn) * 5
                                  : "N.A."}
                              </TableCell>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  onChange={(e) => handleSelectBook(e, book)}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              </TableContainer>
            </div>

            <div
              className="modal-close-button"
              style={{ padding: "0", margin: "0" }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handelReturnBook}
                disabled={apiCalled}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
