import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { searchStudents } from "../../../../services/accounts";

export default function RemainderToStudent() {
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const [students, setStudents] = useState(null);
  const [searched, setSearched] = useState(false);

  const [searchData, setSearchData] = useState({
    name: "",
    rollNumber: "",
    semester: "",
    section: "",
    department: "",
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
          <>hello</>
        )}
      </div>
    </div>
  );
}
