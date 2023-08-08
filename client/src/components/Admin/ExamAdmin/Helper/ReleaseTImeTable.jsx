import {
  Backdrop,
  Button,
  Container,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchExamForm } from "../../../../services/exam";
import { motion as m } from "framer-motion";

export default function ReleaseTImeTable() {
  const examNameOptions = ["ESE B.Tech."];
  const examSessionOption = ["Jan-July", "July-Dec"];
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const [examSessionYearOption, setExamSessionYearOption] = useState([]);
  const [openPasswordBackdrop, setOpenPasswordBackdrop] = useState(false);
  const userId = useLocation().pathname.split("/")[4];
  const [apiCalled, setApiCalled] = useState(false);
  const [examForm, setExamForm] = useState(null);
  const [newExamForm, setNewExamForm] = useState({
    examName: "",
    examSession: "",
    examYear: "",
    examSemester: "",
    password: "",
    userId: userId,
  });
  useEffect(() => {
    document.title = "Release Time Table";
  }, []);
  useEffect(() => {
    const temp = [];
    const currDate = String(new Date());
    for (let i = 0; i < 5; i++) {
      const yearOption = `${Number(currDate.split(" ")[3]) + i} - ${
        Number(currDate.split(" ")[3].slice(1)) + 1 + i
      }`;
      temp.push(yearOption);
      setExamSessionYearOption(() => [...temp]);
    }
  }, []);

  function handleNewExamFormChange(e) {
    setNewExamForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSearchExamForm() {
    setApiCalled(true);

    searchExamForm(newExamForm)
      .then((res) => {
        if (!res.successful) {
          alert(res.message);
          setApiCalled(false);
          return;
        }
        setExamForm(() => res.examForm);
        setApiCalled(false);
      })
      .catch((err) => alert(err));

    setApiCalled(false);
  }

  return (
    <Container>
      <div className="homepage">
        <div className="heading">Release Exam Time Table</div>
      </div>
      <div className="container">
        <div className="heading"></div>
        {!examForm && (
          <div className="form-container">
            <div className="row">
              <TextField
                name="examName"
                select
                label="Select Exam Name"
                helperText="Please select exam name."
                fullWidth
                onChange={handleNewExamFormChange}
                value={newExamForm.examName}
              >
                {examNameOptions.map((examName, idx) => (
                  <MenuItem value={examName} key={idx}>
                    {examName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="examSession"
                select
                label="Select Exam Session"
                helperText="Please select exam session."
                fullWidth
                value={newExamForm.examSession}
                onChange={handleNewExamFormChange}
              >
                {examSessionOption.map((examSession, idx) => (
                  <MenuItem value={examSession} key={idx}>
                    {examSession}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row">
              <TextField
                name="examYear"
                select
                label="Select Exam Session Year"
                helperText="Please select exam session year."
                fullWidth
                value={newExamForm.examYear}
                onChange={handleNewExamFormChange}
              >
                {examSessionYearOption !== [] &&
                  examSessionYearOption.map((examYear, idx) => (
                    <MenuItem value={examYear} key={idx}>
                      {examYear}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                name="examSemester"
                select
                label="Select Semester"
                helperText="Please select semester"
                fullWidth
                onChange={handleNewExamFormChange}
                value={newExamForm.examSemester}
              >
                {semester.map((sem, idx) => (
                  <MenuItem value={sem} key={idx}>
                    {sem}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="row">
              <Button
                onClick={() =>
                  setNewExamForm({
                    examName: "",
                    examYear: "",
                    examSemester: "",
                    examSession: "",
                  })
                }
                color="warning"
                variant="outlined"
                fullWidth
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  if (
                    (newExamForm.examName === "",
                    newExamForm.examYear === "" ||
                      newExamForm.examSession === "" ||
                      newExamForm.examSemester === "")
                  ) {
                    alert("All Fields Are Mandatory To Be Filled.");
                    return;
                  }
                  setOpenPasswordBackdrop(true);
                }}
                color="success"
                variant="contained"
                fullWidth
              >
                Proceed
              </Button>
            </div>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={openPasswordBackdrop}
            >
              <div className="backdrop-element">
                <div className="backdrop-close-btn">
                  <Button
                    onClick={() => {
                      setOpenPasswordBackdrop(false);
                      setNewExamForm((prev) => ({ ...prev, password: "" }));
                    }}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Close
                  </Button>
                </div>
                <div className="backdrop-options-column">
                  <TextField
                    type="password"
                    label="Password"
                    value={newExamForm.password}
                    name="passoword"
                    onChange={(e) =>
                      setNewExamForm({
                        ...newExamForm,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="backdrop-options">
                  <Button
                    onClick={() => {
                      setOpenPasswordBackdrop(false);
                      setNewExamForm((prev) => ({ ...prev, password: "" }));
                    }}
                    variant="outlined"
                    color="warning"
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSearchExamForm}
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={apiCalled}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Backdrop>
          </div>
        )}
        {examForm && (
          <>
            <div className="student-data-container">
              <m.div
                style={{ cursor: "default" }}
                whileHover={{ scale: 1.1 }}
                className="student-data"
              >
                <span className="prefix">Exam Name</span>
                <span className="data">{examForm.examName}</span>
              </m.div>
              <m.div
                style={{ cursor: "default" }}
                whileHover={{ scale: 1.1 }}
                className="student-data"
              >
                <span className="prefix">Exam Session</span>
                <span className="data">{examForm.examSession}</span>
              </m.div>
              <m.div
                style={{ cursor: "default" }}
                whileHover={{ scale: 1.1 }}
                className="student-data"
              >
                <span className="prefix">Exam Year</span>
                <span className="data">{examForm.examYear}</span>
              </m.div>
              <m.div
                style={{ cursor: "default" }}
                whileHover={{ scale: 1.1 }}
                className="student-data"
              >
                <span className="prefix">Exam Semester</span>
                <span className="data">{examForm.examSemester}</span>
              </m.div>
            </div>
            <div className="table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select Subject Priority</TableCell>
                      <TableCell>Select Date</TableCell>
                      <TableCell>Select Time Slot</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>hello</TableCell>
                      <TableCell>this is</TableCell>
                      <TableCell>timepasss</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
