import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addIndividualStudent,
  addStudentsByCSV,
} from "../../../../services/student";
import { useLocation, useNavigate } from "react-router-dom";

export default function StudentManagement() {
  document.title = "Student Management";

  const baseUrl = useLocation().pathname;

  const id = baseUrl.split("/")[3];

  const navigate = useNavigate();
  const [openAddNewStudentBackdrop, setOpenAddNewStudentBackdrop] =
    useState(false);
  const [openAddStudentsCSV, setOpenAddStudentsCSV] = useState(false);
  const departmentOption = ["CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const semesterOptions = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const initialState = {
    name: "",
    email: "",
    rollNumber: "",
    semester: "",
    section: "",
    department: "",
  };
  const [newStudentData, setNewStudentData] = useState(initialState);
  const [fileName, setFileName] = useState("No File Selected...");
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  function handleCloseBackdrop() {
    setOpenAddNewStudentBackdrop(false);
    setNewStudentData(initialState);
    setOpenAddStudentsCSV(false);
  }

  function handleAddNewStudent() {
    setDisableSubmitButton(true);
    //before calling put conditions to check for the data
    const { name, email, rollNumber, semester, section, department } =
      newStudentData;
    if (
      name === "" ||
      email === "" ||
      rollNumber === "" ||
      semester === "" ||
      section === "" ||
      department === ""
    ) {
      setErrorMessage("All Fields Are Mandatory To Be Filled Up !!");
      setDisableSubmitButton(false);
      return;
    }
    if (rollNumber.length < 12) {
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
    setFile(e.target.files[0]);

    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setHideSaveButton(false);
    }
  }

  function handleCSVProcessing(e) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        const columnArray = [];
        const valueArray = [];

        res.data.map((d) => {
          columnArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        setStudents(res.data);
      },
    });
  }

  function handleViewData() {
    const encodedData = encodeURIComponent(JSON.stringify(students));
    const url = `http://localhost:3000/show-data/students/${encodedData}`;
    window.open(url, "_blank", "width=800 height=600");
  }

  function handleUnloadFile(e) {
    setFile(null);
    setStudents([]);
    setFileName("No File Selected...");
    setHideSaveButton(true);
  }

  function addMultipleStudents() {
    setApiCalled(true);
    addStudentsByCSV(students).then((res) => {
      setApiCalled(false);
      if (res.successful === false) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setFile(null);
      setOpenAddStudentsCSV(false);
      navigate(`/admin/Academics/${id}/student-management`);
      return;
    });
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
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => {
              navigate(`${baseUrl}/edit-delete-students`);
            }}
          >
            Edit / Delete Students
          </Button>
          <Button variant="contained" fullWidth size="small">
            View Marks
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
                name="rollNumber"
                fullWidth
                value={newStudentData.rollNumber}
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
              <TextField
                onChange={handleAddStudentDataChange}
                select
                label="Select Department"
                defaultValue=""
                helperText="Please select department"
                name="department"
                value={newStudentData.department}
              >
                {departmentOption.map((dept) => (
                  <MenuItem value={dept} key={dept}>
                    {dept}
                  </MenuItem>
                ))}
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
                <TextField
                  fullWidth
                  value={fileName}
                  disabled
                  sx={{ backgroundColor: "#D5FFD0" }}
                />
                {fileName !== "No File Selected..." && (
                  <>
                    <Button
                      onClick={handleUnloadFile}
                      variant="contained"
                      color="error"
                    >
                      <DeleteIcon fontSize="large" />
                    </Button>
                  </>
                )}
              </div>

              {fileName === "No File Selected..." && (
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept=".csv"
                    hidden
                  />
                </Button>
              )}

              {!hideSaveButton && students.length === 0 && (
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  size="large"
                  onClick={handleCSVProcessing}
                >
                  Process CSV File
                </Button>
              )}
              {!hideSaveButton && students.length !== 0 && (
                <div className="row">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="warning"
                    onClick={handleViewData}
                  >
                    View Processed Data
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    size="large"
                    onClick={addMultipleStudents}
                    disabled={apiCalled}
                  >
                    {apiCalled ? (
                      <>
                        <CircularProgress color="inherit" size={30} />
                      </>
                    ) : (
                      "Add Students"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
