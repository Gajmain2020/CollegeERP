import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Backdrop,
} from "@mui/material";
import { useState } from "react";
import {
  searchStudents,
  sendRemainderToStudent,
} from "../../../../services/accounts";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import CloseIcon from "@mui/icons-material/Close";

export default function RemainderToStudent() {
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const [students, setStudents] = useState(null);
  const [searched, setSearched] = useState(false);
  const [sendRemainder, setSendRemainder] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);

  const [searchData, setSearchData] = useState({
    name: "",
    rollNumber: "",
    semester: "",
    section: "",
    department: "",
    feePaid: "",
  });

  function handleSearchDataChange(e) {
    setSearchData((searchData) => ({
      ...searchData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSearch() {
    searchStudents(searchData)
      .then((res) => {
        setStudents(res.students);
        setSearched(true);
      })
      .catch((err) => console.log(err));
  }

  function handleSendRemainder() {
    sendRemainderToStudent(sendRemainder)
      .then((res) => {
        setApiCalled(false);
        alert(res.message);
        if (res.succecssful === false) {
          alert("i am here");
          return;
        }
        setSendRemainder(() => null);
        return;
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="homepage">
        <div className="heading">Send Remainder To Students</div>
        <div className="search-container">
          <Paper
            sx={{ width: "100%", height: "100%" }}
            className="search-component"
            elevation={6}
          >
            <div style={{ width: "100%" }} className="container">
              <div
                className="form-container"
                style={{ padding: "0.5em 0.75em 0 0.75em" }}
              >
                <div className="row">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleSearchDataChange}
                    value={searchData?.name}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Roll Number"
                    name="rollNumber"
                    onChange={handleSearchDataChange}
                    value={searchData?.rollNumber}
                  />
                  <TextField
                    name="semester"
                    select
                    label="Select Semester"
                    helperText="Please select semester."
                    sx={{
                      width: "60%",
                    }}
                    onChange={handleSearchDataChange}
                    value={searchData?.semester}
                  >
                    {semester.map((sem, idx) => (
                      <MenuItem value={sem} key={idx}>
                        {sem}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="department"
                    select
                    label="Select Department"
                    helperText="Please select department."
                    sx={{
                      width: "70%",
                    }}
                    onChange={handleSearchDataChange}
                    value={searchData?.department}
                  >
                    {department.map((dept, idx) => (
                      <MenuItem value={dept} key={idx}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    sx={{
                      marginTop: "7px",
                      padding: "0.5em 1em",
                      width: "30%",
                    }}
                    variant="outlined"
                    onClick={handleSearch}
                    color="success"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </div>

        {!students ? (
          <div style={{ marginTop: "1em" }} className="search-container">
            <Paper className="search-component">
              <div className="info">
                {searched
                  ? "No Data Found For The Given Search Query."
                  : "All students will not be displayed in this table. Please search according to requirements."}
              </div>
            </Paper>
          </div>
        ) : (
          <>
            <div className="table">
              <TableContainer component={Paper}>
                <Table size="small" sx={{ minWidth: "650px" }}>
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: "#9EB384", height: "3em" }}
                    >
                      <TableCell>S.No.</TableCell>
                      <TableCell>Roll Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Semester</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell sx={{ width: "15%" }}>
                        Send Remainder
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student, idx) => {
                      return (
                        <TableRow key={student._id}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.semester}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setSendRemainder(student);
                              }}
                            >
                              <SendTwoToneIcon
                                sx={{ transform: "rotate(-25deg)" }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {sendRemainder !== null && (
              <>
                {" "}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={sendRemainder !== null}
                >
                  <div className="backdrop-element">
                    <div className="backdrop-close-btn">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setSendRemainder(null);
                        }}
                      >
                        <CloseIcon fontSize="large" />
                      </Button>
                    </div>
                    <div className="backdrop-options">
                      <div className="message" style={{ fontSize: "1.2em" }}>
                        Are you sure you want to send remainder to student?
                      </div>
                      <div className="student-details">
                        <div className="row">
                          <span>Name ::</span> <b>{sendRemainder.name}</b>
                        </div>
                        <div className="row">
                          <span>Roll Number ::</span>{" "}
                          <b>{sendRemainder.rollNumber}</b>
                        </div>
                        <div className="row">
                          <span>Semester :: </span>{" "}
                          <b>{sendRemainder.semester}</b>
                        </div>
                        <div className="row">
                          <span>Department :: </span>{" "}
                          <b>{sendRemainder.department}</b>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        onClick={handleSendRemainder}
                        disabled={apiCalled}
                      >
                        Send Remainder
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          setSendRemainder(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Backdrop>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
