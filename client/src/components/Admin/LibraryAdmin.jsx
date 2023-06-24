import {
  Alert,
  Backdrop,
  Button,
  FormLabel,
  InputAdornment,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addSingleBook } from "../../services/library";
import Navbar from "../Navbar/Navbar";

export default function LibraryAdmin({ id }) {
  const [openAddBookBackDrop, setOpenAddBookBackDrop] = useState(false);
  const [openSingleBookAdd, setOpenSingleBookAdd] = useState(false);
  const [openMultipleBookAdd, setOpenMultipleBookAdd] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialState = {
    bookName: "",
    bookId: "",
    bookAuthor: "",
    noOfBook: "",
    priceBook: "",
  };
  const [singleBook, setSingleBook] = useState(initialState);

  function handleSingleBookChange(e) {
    setSingleBook({ ...singleBook, [e.target.name]: e.target.value });
    setDisableAddButton(false);
    setErrorMessage("");
  }

  function handleAddSingleBook() {
    setDisableAddButton(true);
    if (
      singleBook.bookName === "" ||
      singleBook.bookId === "" ||
      singleBook.bookAuthor === "" ||
      singleBook.noOfBook === "" ||
      singleBook.priceBook === ""
    ) {
      setErrorMessage("All Fields Are Mandatory");
      setDisableAddButton(false);
      return;
    }

    //! get Your API call
    addSingleBook(singleBook).then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        setDisableAddButton(false);
        return;
      }
      alert(res.message);
      setSingleBook(initialState);
      setDisableAddButton(false);
    });
  }

  return (
    <>
      <div className="main-container homepage">
        {/* ERROR HANDLING */}
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

        <div className="heading">Welcome Admin</div>
        <div className="button-container">
          <div className="button-row">
            <Button
              onClick={() => setOpenAddBookBackDrop(true)}
              variant="contained"
              fullWidth
              size="small"
            >
              Add Books
            </Button>
            <Button
              onClick={() => console.log("hello")}
              variant="contained"
              fullWidth
              size="small"
            >
              Issue Book
            </Button>
          </div>
          <div className="button-row">
            <Button
              onClick={() => console.log("hello")}
              variant="contained"
              fullWidth
              size="small"
            >
              Requested Books
            </Button>
            <Button
              variant="contained"
              onClick={() => console.log("hello")}
              fullWidth
              size="small"
            >
              Edit / Remove Book(s)
            </Button>
          </div>
          <div className="button-row">
            <Button
              variant="contained"
              onClick={() => console.log("hello")}
              fullWidth
              size="small"
            >
              Complaints
            </Button>
            <Button
              onClick={() => console.log("hello")}
              variant="contained"
              fullWidth
              size="small"
            >
              Return Book
            </Button>
          </div>
        </div>

        {/* THIS IS FIRST BACKDROP */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openAddBookBackDrop}
          className="test"
        >
          <div className="backdrop-element">
            <div className="backdrop-close-btn">
              <Button
                onClick={() => setOpenAddBookBackDrop(false)}
                variant="contained"
                color="error"
                size="small"
              >
                <CloseIcon fontSize="large" />
              </Button>
            </div>
            <div className="backdrop-options">
              <Button
                onClick={() => {
                  setOpenSingleBookAdd(true);
                  setOpenAddBookBackDrop(false);
                }}
                fullWidth
                variant="contained"
                color="success"
              >
                Add Single Book
              </Button>
              <Button
                onClick={() => {
                  setOpenMultipleBookAdd(true);
                  setOpenAddBookBackDrop(false);
                }}
                fullWidth
                idth
                variant="contained"
                color="warning"
              >
                Add Books VIA CSV Sheet
              </Button>
            </div>
          </div>
        </Backdrop>

        {/* Second BackDROP for singleBook add */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openSingleBookAdd}
        >
          <div className="backdrop-element">
            <div className="backdrop-close-btn">
              <Button
                onClick={() => {
                  setOpenSingleBookAdd(false);
                  setOpenAddBookBackDrop(true);
                }}
                variant="contained"
                color="error"
                size="small"
              >
                <CloseIcon fontSize="large" />
              </Button>
            </div>
            <div className="backdrop-options-column">
              <TextField
                onChange={handleSingleBookChange}
                value={singleBook.bookName}
                label="Book Name"
                name="bookName"
                fullWidth
              />
              <TextField
                onChange={handleSingleBookChange}
                value={singleBook.bookId}
                label="Book ID"
                name="bookId"
                fullWidth
              />

              <TextField
                onChange={handleSingleBookChange}
                value={singleBook.bookAuthor}
                label="Author Name"
                name="bookAuthor"
              />
              <TextField
                onChange={handleSingleBookChange}
                value={singleBook.noOfBook}
                label="Nos. Of Books"
                name="noOfBook"
                type="number"
              />
              <TextField
                onChange={handleSingleBookChange}
                value={singleBook.priceBook}
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
                onClick={handleAddSingleBook}
                disabled={disableAddButton}
                variant="contained"
                color="success"
                size="large"
              >
                Add
              </Button>
            </div>
          </div>
        </Backdrop>
      </div>
    </>
  );
}
