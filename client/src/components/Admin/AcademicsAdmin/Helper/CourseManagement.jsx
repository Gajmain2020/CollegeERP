import {
  Alert,
  Backdrop,
  Button,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { addCourse } from "../../../../services/department";

export default function CourseManagement() {
  const navigate = useNavigate();
  const baseUrl = useLocation().pathname;
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const [option, setOption] = useState(0);
  const [newCourse, setNewCourse] = useState({
    department: "",
    semester: "",
    courseName: "",
    courseCode: "",
    courseType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleCloseBackdrop() {
    setOption(0);
    setNewCourse({
      courseName: "",
      courseCode: "",
      department: "",
      semester: "",
      courseType: "",
    });
  }

  function handleChange(e) {
    setNewCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleAddCourse() {
    if (
      newCourse.department === "" &&
      newCourse.courseName === "" &&
      newCourse.semester === "" &&
      newCourse.courseCode === "" &&
      newCourse.courseType === ""
    ) {
      setErrorMessage("Please enter all the fields below to add the course.");
      return;
    }

    //! make api call to add course to the database
    addCourse(newCourse)
      .then((res) => {
        if (!res.successful) {
          setErrorMessage(res.message);
          return;
        }
        alert(res.message);
        handleCloseBackdrop();
        return;
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return (
    <>
      <div className="homepage">
        <div className="heading">Welcome To Course Management Module</div>
        <div className="button-container">
          <div className="button-row">
            <Button fullWidth variant="contained" onClick={() => setOption(1)}>
              Add Course
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate(baseUrl + `/edit-course`)}
            >
              Edit Course
            </Button>
          </div>
          <div className="button-row">
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate(baseUrl + `/add-course-syllabus`)}
            >
              Add Syllabus
            </Button>
          </div>
        </div>
      </div>
      <Backdrop
        open={option !== 0}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <div className="backdrop-element">
          <div className="backdrop-close-btn">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleCloseBackdrop}
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="backdrop-heading">Add Course</div>
          <div className="backdrop-options-column">
            <Snackbar
              open={errorMessage !== ""}
              autoHideDuration={4000}
              onClose={() => setErrorMessage("")}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>

            <div className="row">
              <TextField
                label="Department"
                select
                name="department"
                onChange={handleChange}
                value={newCourse.department}
                fullWidth
              >
                {department.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Semester"
                select
                name="semester"
                onChange={handleChange}
                value={newCourse.semester}
                fullWidth
              >
                {semester.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    {sem}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Course Type"
                select
                name="courseType"
                onChange={handleChange}
                value={newCourse.courseType}
                fullWidth
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="lab">LAB</MenuItem>
                <MenuItem value="theory">Theory</MenuItem>
              </TextField>
            </div>
            <TextField
              label="Course Name"
              name="courseName"
              value={newCourse.courseName}
              onChange={handleChange}
            />
            <TextField
              label="Course Code"
              name="courseCode"
              value={newCourse.courseCode}
              onChange={handleChange}
            />
            <div className="row">
              <Button
                variant="outlined"
                color="warning"
                fullWidth
                onClick={() => {
                  setNewCourse({
                    department: "",
                    courseName: "",
                    courseCode: "",
                    courseType: "",
                    semester: "",
                  });
                }}
                sx={{ width: "70%", textTransform: "none" }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={handleAddCourse}
              >
                Add Course
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}
