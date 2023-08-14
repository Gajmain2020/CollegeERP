import {
  Backdrop,
  Button,
  Container,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publishNewBacklogExamForm } from "../../../../services/exam";

export default function ReleaseBacklogForm() {
  const examNameOptions = ["ESE B.Tech. Backlog"];
  const examSessionOption = ["Jan-July", "July-Dec"];
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const [examSessionYearOption, setExamSessionYearOption] = useState([]);
  const [openPasswordBackdrop, setOpenPasswordBackdrop] = useState(false);
  const userId = useLocation().pathname.split("/")[4];
  const [newExamForm, setNewExamForm] = useState({
    userId: userId,
    examName: "",
    examYear: "",
    examSemester: "",
    examSession: "",
    password: "",
    examType: "backlog",
  });

  useEffect(() => {
    document.title = "Backlog Exam Form Release";
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

  function handleReleaseExamForm() {
    if (newExamForm.password === "") {
      alert("Please Enter Password To Proceed Further.");
      return;
    }
    publishNewBacklogExamForm(newExamForm)
      .then((res) => {
        if (!res.successful) {
          alert(res.message);
          return;
        }
        alert(res.message);
        setNewExamForm({
          examName: "",
          examYear: "",
          examSemester: "",
          examSession: "",
        });
        setOpenPasswordBackdrop(false);
        return;
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <div className="homepage">
        <div className="heading">Release Backlog Exam Form</div>
        <div className="button-container"></div>

        <>
          <div className="container">
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
                      onClick={() => setOpenPasswordBackdrop(false)}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      close
                    </Button>
                  </div>
                  <div className="backdrop-options-column">
                    <TextField
                      type="password"
                      label="Password"
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
                      onClick={() => setOpenPasswordBackdrop(false)}
                      variant="outlined"
                      color="warning"
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleReleaseExamForm}
                      variant="contained"
                      color="success"
                      fullWidth
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Backdrop>
            </div>
          </div>
        </>
      </div>
    </Container>
  );
}
