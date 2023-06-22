import { Alert, Backdrop, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import { addIndividualStudent } from "../../../services/student";

export default function StudentManagement() {
  document.title = "Student Management";
  const [openAddNewStudentBackdrop, setOpenAddNewStudentBackdrop] =
    useState(false);
  const [openAddStudentsCSV, setOpenAddStudentsCSV] = useState(false);
  const semesterOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const initialState = {
    name: "",
    email: "",
    rollNo: "",
    semester: "",
    section: "",
  };
  const [newStudentData, setNewStudentData] = useState(initialState);
  const [fileName, setFileName] = useState("No File Selected");
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCloseBackdrop() {
    setOpenAddNewStudentBackdrop(false);
    setOpenAddStudentsCSV(false);
  }

  function handleAddNewStudent() {
    setDisableSubmitButton(true);
    //before calling put conditions to check for the data
    const { name, email, rollNo, semester, section } = newStudentData;
    if (
      name === "" ||
      email === "" ||
      rollNo === "" ||
      semester === "" ||
      section === ""
    ) {
      setErrorMessage("All Fields Are Mandatory To Be Filled Up !!");
      setDisableSubmitButton(false);
      return;
    }
    if (rollNo.length < 12) {
      setErrorMessage("Check The Roll Number !!");
      setDisableSubmitButton(false);
      return;
    }

    addIndividualStudent(newStudentData)
      .then((res) => {
        if (res.successful === true) {
          alert(res.message);
        } else {
          setErrorMessage(res.message);
          setDisableSubmitButton(false);
        }
        setDisableSubmitButton(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setDisableSubmitButton(false);
      });
  }

  function handleAddStudentDataChange(e) {
    setNewStudentData({ ...newStudentData, [e.target.name]: e.target.value });
    setDisableSubmitButton(false);
    setErrorMessage("");
  }

  function handleFileUpload(e) {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      console.log(fileName);
      setHideSaveButton(false);
    }
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        console.log(res);
        const columnArray = [];
        const valueArray = [];

        res.data.map((d) => {
          columnArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        //need to set this data to useState for further processing
        // setDisableSubmitButton(() => false);
      },
    });
  }

  function handleUnloadFile() {
    setFileName("No File Selected");
    setHideSaveButton(true);
  }

  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() => setOpenAddNewStudentBackdrop(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            Add Individual Student
          </Button>
          <Button
            onClick={() => setOpenAddStudentsCSV(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            Add Students VIA CSV Sheet
          </Button>
        </div>
        <div className="button-row">
          <Button variant="contained" fullWidth size="small">
            Edit Student Details
          </Button>
          <Button variant="contained" fullWidth size="small">
            View Marks
          </Button>
        </div>
        <div className="button-row">
          <Button variant="contained" fullWidth size="small">
            View All Students
          </Button>
          <Button variant="contained" fullWidth size="small">
            Delete Students
          </Button>
        </div>
      </div>

      {/* Backdrop 1 for individual student addition */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddNewStudentBackdrop}
      >
        <div className="backdrop-element">
          <div className="backdrop-close-btn">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleCloseBackdrop}
            >
              <CloseIcon fontSize="large" />
            </Button>
          </div>
          <div className="backdrop-options">
            <div className="backdrop-options-column">
              {errorMessage !== "" && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setErrorMessage("");
                  }}
                >
                  {errorMessage}
                </Alert>
              )}
              <TextField
                label="Name"
                onChange={handleAddStudentDataChange}
                name="name"
                fullWidth
                value={newStudentData.name}
              />
              <TextField
                onChange={handleAddStudentDataChange}
                label="Email"
                name="email"
                fullWidth
                value={newStudentData.email}
              />
              <TextField
                onChange={handleAddStudentDataChange}
                label="Roll Number"
                name="rollNo"
                fullWidth
                value={newStudentData.rollNo}
              />

              <TextField
                onChange={handleAddStudentDataChange}
                select
                label="Select Semester"
                defaultValue=""
                helperText="Please select Semester"
                name="semester"
                value={newStudentData.semester}
              >
                {semesterOptions.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                onChange={handleAddStudentDataChange}
                select
                defaultValue=""
                label="Select Section"
                helperText="Please select Section"
                name="section"
                value={newStudentData.section}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </TextField>
              <Button
                onClick={handleAddNewStudent}
                variant="contained"
                disabled={disableSubmitButton}
                color="success"
                size="large"
              >
                Add
              </Button>
              <Button
                onClick={() => setNewStudentData(initialState)}
                variant="contained"
                color="warning"
                size="small"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>

      {/* Backdrop 2 for students addition via CSV */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddStudentsCSV}
        className="test"
      >
        <div className="backdrop-element">
          <div className="backdrop-close-btn">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleCloseBackdrop}
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
                      <DeleteIcon fontSize="large" />
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
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  size="large"
                >
                  Proceed
                </Button>
              )}
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
