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
import { useLocation, useNavigate } from "react-router-dom";
import {
  addFacultiesByCSV,
  addIndividualFaculty,
} from "../../../../services/faculty";

export default function FacultyManagement() {
  document.title = "Faculty Management";

  const baseUrl = useLocation().pathname;

  const id = baseUrl.split("/")[3];

  const navigate = useNavigate();
  const [openAddNewFacultyBackdrop, setOpenAddNewFacultyBackdrop] =
    useState(false);
  const [openAddFacultyCSV, setOpenAddFacultyCSV] = useState(false);
  const departmentOption = [
    "",
    "CSE",
    "CIVIL",
    "EE",
    "EEE",
    "ETC",
    "IT",
    "MECH",
  ];
  const initialState = {
    name: "",
    email: "",
    department: "",
    empId: "",
  };
  const [newFacultyData, setNewFacultyData] = useState(initialState);
  const [fileName, setFileName] = useState("No File Selected...");
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  function handleCloseBackdrop() {
    setOpenAddNewFacultyBackdrop(false);
    setNewFacultyData(initialState);
    setOpenAddFacultyCSV(false);
  }

  function handleAddNewFaculty() {
    setDisableSubmitButton(true);
    //before calling put conditions to check for the data
    const { name, email, empId, department } = newFacultyData;
    if (name === "" || email === "" || department === "" || empId === "") {
      setErrorMessage("All Fields Are Mandatory To Be Filled Up !!");
      setDisableSubmitButton(false);
      return;
    }

    addIndividualFaculty(newFacultyData)
      .then((res) => {
        if (res.successful === true) {
          alert(res.message);
          setOpenAddNewFacultyBackdrop(false);
          setNewFacultyData({
            name: "",
            department: "",
            empId: "",
            email: "",
          });
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

  function handleAddFacultyDataChange(e) {
    setNewFacultyData({ ...newFacultyData, [e.target.name]: e.target.value });
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

        setFaculties(res.data);
      },
    });
  }

  function handleViewData() {
    const encodedData = encodeURIComponent(JSON.stringify(faculties));
    const url = `http://localhost:3000/show-data/faculty/${encodedData}`;
    window.open(url, "_blank", "width=800 height=600");
  }

  function handleUnloadFile(e) {
    setFile(null);
    setFaculties([]);
    setFileName("No File Selected...");
    setHideSaveButton(true);
  }

  function addMultipleFaculties() {
    setApiCalled(true);
    addFacultiesByCSV(faculties).then((res) => {
      setApiCalled(false);
      if (res.successful === false) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setFile(null);
      setOpenAddFacultyCSV(false);
      navigate(`/admin/Academics/${id}/faculty-management`);
      return;
    });
  }

  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() => setOpenAddNewFacultyBackdrop(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            Add Individual Faculty
          </Button>
          <Button
            onClick={() => setOpenAddFacultyCSV(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            Add Faculties VIA CSV Sheet
          </Button>
        </div>
        <div className="button-row">
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => {
              navigate(`${baseUrl}/edit-delete-faculties`);
            }}
          >
            Edit / Delete Faculties
          </Button>
        </div>
      </div>

      {/* Backdrop 1 for individual student addition */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddNewFacultyBackdrop}
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
                onChange={handleAddFacultyDataChange}
                name="name"
                fullWidth
                value={newFacultyData.name}
              />
              <TextField
                onChange={handleAddFacultyDataChange}
                label="Email"
                name="email"
                fullWidth
                value={newFacultyData.email}
              />
              <TextField
                onChange={handleAddFacultyDataChange}
                label="Emp Id"
                name="empId"
                fullWidth
                value={newFacultyData.empId}
              />

              <TextField
                onChange={handleAddFacultyDataChange}
                select
                label="Select Department"
                defaultValue=""
                helperText="Please select department"
                name="department"
                value={newFacultyData.department}
              >
                {departmentOption.map((dept) => (
                  <MenuItem value={dept} key={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                onClick={handleAddNewFaculty}
                variant="contained"
                disabled={disableSubmitButton}
                color="success"
                size="large"
              >
                Add
              </Button>
              <Button
                onClick={() => setNewFacultyData(initialState)}
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
        open={openAddFacultyCSV}
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

              {!hideSaveButton && faculties.length === 0 && (
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
              {!hideSaveButton && faculties.length !== 0 && (
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
                    onClick={addMultipleFaculties}
                    disabled={apiCalled}
                  >
                    {apiCalled ? (
                      <>
                        <CircularProgress color="inherit" size={30} />
                      </>
                    ) : (
                      "Add Faculties"
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
