import {
  Alert,
  Backdrop,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addMultipleBooks, addSingleBook } from "../../../services/library";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import { decodeToken } from "../../../services/common";

export default function LibraryAdmin({ id }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const initialState = {
    bookName: "",
    bookId: "",
    bookAuthor: "",
    noOfBook: "",
    priceBook: "",
  };

  useEffect(() => {
    if (!token) {
      navigate("/not-logged-in");
      return;
    }
  });

  const [userDetails, setUserDetails] = useState(null);
  const [openAddBookBackDrop, setOpenAddBookBackDrop] = useState(false);
  const [openSingleBookAdd, setOpenSingleBookAdd] = useState(false);
  const [openMultipleBookAdd, setOpenMultipleBookAdd] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [singleBook, setSingleBook] = useState(initialState);
  const [fileName, setFileName] = useState("No File Selected");
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    decodeToken(token)
      .then((res) => setUserDetails(res))
      .catch((err) => setErrorMessage(err.message));
  }, [token]);

  function handleSingleBookChange(e) {
    setSingleBook({ ...singleBook, [e.target.name]: e.target.value });
    setDisableAddButton(false);
    setErrorMessage("");
  }
  function handleUnloadFile() {
    setFileName("No File Selected");
    setHideSaveButton(true);
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

  function handleFileUpload(e) {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setHideSaveButton(false);
    }
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        const columnArray = [];
        const valueArray = [];

        res.data.map((d) => {
          columnArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        setData(() => res.data);
      },
    });
  }

  function handleAddMultipleBooks() {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].bookId === "" ||
        data[i].bookName === "" ||
        data[i].bookAuthor === "" ||
        data[i].noOfBooks === "" ||
        data[i].priceBook === ""
      ) {
        setErrorMessage(
          "Some fields are empty in CSV file. Please update CSV and Upload."
        );
        return;
      }
    }
    addMultipleBooks(data)
      .then((res) => {
        alert(res.message);
        setOpenAddBookBackDrop(false);
        setOpenMultipleBookAdd(false);
        handleUnloadFile();
      })
      .catch((err) => console.log(err));
  }

  function handleViewData() {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    const url = `http://localhost:3000/show-data/library/${encodedData}`;
    window.open(url, "_blank", "width=800 height=600");
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
              onClick={() =>
                navigate(`/admin/Library/issue-books/${userDetails.id}`)
              }
              variant="contained"
              fullWidth
              size="small"
            >
              Issue Book
            </Button>
          </div>
          <div className="button-row">
            <Button
              onClick={() => alert("work pending here")}
              variant="contained"
              fullWidth
              size="small"
            >
              Requested Books
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                navigate(`/admin/Library/edit-books/${userDetails.id}`)
              }
              fullWidth
              size="small"
            >
              Edit / Remove Book(s)
            </Button>
          </div>
          <div className="button-row">
            <Button
              variant="contained"
              onClick={() => alert("work pending here")}
              fullWidth
              size="small"
            >
              Complaints
            </Button>
            <Button
              onClick={() =>
                navigate(`/admin/Library/return-books/${userDetails.id}`)
              }
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

        {/* BACKDROP FOR MULTIPLE BOOK ADD  */}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openMultipleBookAdd}
          className="test"
        >
          <div className="backdrop-element">
            <div className="backdrop-close-btn">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => {
                  setOpenMultipleBookAdd(false);
                  setFileName("No File Selected");
                  setHideSaveButton(true);
                }}
              >
                <CloseIcon fontSize="large" />
              </Button>
            </div>
            <div className="backdrop-options">
              <div className="backdrop-options-column">
                <div className="password">
                  <TextField fullWidth value={fileName} />
                  {fileName !== "No File Selected" && (
                    <>
                      <Button
                        onClick={handleUnloadFile}
                        variant="contained"
                        color="error"
                        size="large"
                      >
                        <DeleteIcon />
                      </Button>
                    </>
                  )}
                </div>

                <Button variant="contained" component="label">
                  Upload File
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept=".csv"
                    hidden
                  />
                </Button>

                {!hideSaveButton && (
                  <>
                    <Button
                      onClick={handleAddMultipleBooks}
                      variant="contained"
                      fullWidth
                      color="success"
                      size="large"
                    >
                      Proceed
                    </Button>
                    <Button size="small" onClick={handleViewData}>
                      Click Here To Varify Data
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </>
  );
}
