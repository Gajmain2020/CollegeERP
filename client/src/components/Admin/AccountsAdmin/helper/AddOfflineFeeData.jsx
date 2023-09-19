import {
  Alert,
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
import SearchIcon from "@mui/icons-material/Search";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import { useState } from "react";

export default function AddOfflineFeeData() {
  const [errorMessage, setErrorMessage] = useState("");
  const [searchData, setSearchData] = useState({ studentRollNumber: "" });
  const [hideSearchButton, setHideSearchButton] = useState(false);
  const [studetData, setStudentData] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);

  function handleSearchDataChange(e) {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  }

  function handelSearchStudnet() {
    console.log("searchin...");
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
        <div className="heading">Add Offline Fee Data</div>
      </div>
    </>
  );
}
