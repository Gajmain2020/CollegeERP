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
import { publishTimeTable, searchExamForm } from "../../../../services/exam";
import { motion as m } from "framer-motion";
import { format } from "date-fns";

export default function ReleaseTImeTable() {
  const examNameOptions = ["ESE B.Tech.", "ESE B.Tech. Backlog"];
  const examSessionOption = ["Jan-July", "July-Dec"];
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const [examPriority, setExamPriority] = useState([
    "",
    "Priority 1 (Subject Code Ending With 1)",
    "Priority 2 (Subject Code Ending With 2)",
    "Priority 3 (Subject Code Ending With 3)",
    "Priority 4 (Subject Code Ending With 4)",
    "Priority 5 (Subject Code Ending With 5)",
  ]);
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
    examType: "",
    userId: userId,
  });
  const [singleExamSlot, setSingleExamSlot] = useState({
    examPriority: "",
    examDate: "",
    examTime: "",
  });
  const [timeTablePublished, setTimeTablePublished] = useState(false);
  const [examSlots, setExamSlots] = useState([]);

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
        console.log(res.examForm);
        setApiCalled(false);
      })
      .catch((err) => alert(err));

    setApiCalled(false);
  }

  function handleTimeTableSelectChange(e) {
    setSingleExamSlot((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleAddExam() {
    if (
      singleExamSlot.examDate === "" ||
      singleExamSlot.examPriority === "" ||
      singleExamSlot.examTime === ""
    ) {
      alert("All Fields Are Mandatory To Be Filled.");
      return;
    }
    setExamPriority(
      examPriority.filter((exam) => exam !== singleExamSlot.examPriority)
    );
    setExamSlots((prev) => [...prev, singleExamSlot]);
    setSingleExamSlot({
      examPriority: "",
      examDate: "",
      examTime: "",
    });
  }

  function handlePublishTimeTableClick() {
    setApiCalled(true);

    publishTimeTable(examSlots, examForm).then((res) => {
      if (res.successful === false) {
        alert(res.message);
        setApiCalled(false);
        return;
      }
      setExamForm((examForm) => ({ ...examForm, examTimeTable: examSlots }));
      setApiCalled(false);
      setExamSlots([]);
      alert(res.message);
      setTimeTablePublished((prev) => !prev);
      return;
    });
    setApiCalled(false);
  }

  return (
    <Container>
      <div className="homepage">
        <div className="heading">Release Exam Time Table</div>
      </div>
      <div className="container">
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
              <TextField
                name="examType"
                select
                label="Select Exam Type"
                helperText="Please select exam type"
                fullWidth
                onChange={handleNewExamFormChange}
                value={newExamForm.examType}
              >
                <MenuItem value="regular">Regular Exams</MenuItem>
                <MenuItem value="backlog">Backlog Exams</MenuItem>
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
        {examForm &&
          examForm.examTimeTable.length === 0 &&
          !timeTablePublished && (
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
                        <TableCell>Add</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField
                            select
                            label="Select Subject Priority"
                            helperText="Please select subject priority."
                            fullWidth
                            name="examPriority"
                            onChange={handleTimeTableSelectChange}
                            value={singleExamSlot.examPriority}
                          >
                            {examPriority.map((subject, idx) => (
                              <MenuItem key={idx} value={subject}>
                                {subject}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            helperText="Please select exam date."
                            name="examDate"
                            fullWidth
                            onChange={handleTimeTableSelectChange}
                            value={singleExamSlot.examDate}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="time"
                            helperText="Please select exam time slot."
                            name="examTime"
                            fullWidth
                            onChange={handleTimeTableSelectChange}
                            value={singleExamSlot.examTime}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={handleAddExam}
                            color="success"
                            variant="outlined"
                            disabled={apiCalled}
                          >
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              {examSlots.length !== 0 && !timeTablePublished && (
                <div className="table">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Exam Priority</TableCell>
                          <TableCell>Exam Date</TableCell>
                          <TableCell>Exam Time</TableCell>
                          <TableCell>Remove</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {examSlots.map((exam, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell>{exam.examPriority}</TableCell>
                              <TableCell>
                                {format(new Date(exam.examDate), "dd-MM-yyyy")}
                              </TableCell>
                              <TableCell>{exam.examTime}</TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="warning"
                                  disabled={apiCalled}
                                  onClick={() => {
                                    setExamPriority((prev) => [
                                      ...prev,
                                      exam.examPriority,
                                    ]);
                                    setExamSlots(
                                      examSlots.filter(
                                        (ex) =>
                                          ex.examPriority !== exam.examPriority
                                      )
                                    );
                                  }}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              {examSlots.length === 5 && !timeTablePublished && (
                <>
                  <div className="table">
                    <TableContainer
                      sx={{ marginBottom: "2em", backgroundColor: "#F1F0E8" }}
                      component={Paper}
                    >
                      <div
                        style={{ padding: "1em 3em" }}
                        className="button-container"
                      >
                        <Button
                          className="outline-effect"
                          fullWidth
                          variant="outlined"
                          onClick={handlePublishTimeTableClick}
                          disabled={apiCalled}
                        >
                          Publish
                        </Button>
                      </div>
                    </TableContainer>
                  </div>
                </>
              )}
            </>
          )}

        {examForm && examForm.examTimeTable.length !== 0 && (
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
            <div className="notice">
              <p>* Exam Time Table Has Been Published Already.</p>
            </div>
            <div className="table">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Priority</TableCell>
                      <TableCell>Exam Date</TableCell>
                      <TableCell>Exam Time Slot</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examForm.examTimeTable.map((tt, idx) => {
                      return (
                        <TableRow key={idx}>
                          <TableCell>{tt.examPriority}</TableCell>
                          <TableCell>
                            {format(new Date(tt.examDate), "dd-MM-yyyy")}
                          </TableCell>
                          <TableCell>{tt.examTime}</TableCell>
                        </TableRow>
                      );
                    })}
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
