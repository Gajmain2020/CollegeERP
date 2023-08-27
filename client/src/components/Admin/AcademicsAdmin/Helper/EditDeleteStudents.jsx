import {
  Backdrop,
  Button,
  Checkbox,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import {
  deleteMultipleStudents,
  deleteSingleStudent,
  getAllStudents,
  updateMultipleStudent,
  updateSingleStudent,
} from "../../../../services/student";
import { checkTargetForNewValues, color } from "framer-motion";

export default function EditDeleteStudents() {
  const [studentsFromDB, setStudentsFromDB] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchData, setSearchData] = useState({
    name: "",
    rollNumber: "",
    semester: "",
    department: "",
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const [multipleStudentAction, setMultipleStudentAction] = useState(0);
  const [singleStudentAction, setSingleStudentAction] = useState(0);
  const [apiCalled, setApiCalled] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [modifiedStudentData, setModifiedStudentData] = useState(null);
  const [bulkUpdate, setBulkUpdate] = useState({
    semester: "",
    department: "",
  });

  useEffect(() => {
    if (studentsFromDB.length === 0) {
      getAllStudents().then((res) => {
        if (res.successful === false) {
          alert(res.message);
          return;
        }
        setStudentsFromDB(res.students);
        setAllStudents(res.students);
        setCurrentPage(1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allStudents !== []) {
      setTotalPages(Math.ceil(allStudents.length / itemsPerPage));
      const start = itemsPerPage * (currentPage - 1);
      const end = Math.min(itemsPerPage * currentPage, allStudents.length);
      setStudents(() => [...allStudents.slice(start, end)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStudents, currentPage, totalPages]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  //! UTILITIES FOR PAGINATION BUTTONS
  function handleNextClick() {
    if (currentPage === totalPages) return;
    setCurrentPage((idx) => idx + 1);
  }
  function handlePrevClick() {
    if (currentPage === 1) return;
    setCurrentPage((idx) => idx - 1);
  }

  function renderButtons() {
    const button = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        button.push(
          <Button
            size="small"
            variant={i !== currentPage ? "outlined" : "contained"}
            key={i}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </Button>
        );
      }
      return button;
    }

    if (currentPage === 1) {
      for (let i = 1; i <= currentPage + 4; i++) {
        button.push(
          <Button
            size="small"
            variant={i !== currentPage ? "outlined" : "contained"}
            key={i}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </Button>
        );
      }
      return button;
    } else if (currentPage !== 1 && currentPage !== totalPages) {
      button.push(
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </Button>
      );

      button.push(<span style={{ color: "#1976d2" }}>...</span>);

      for (
        let i = currentPage - 1;
        i <= Math.min(currentPage + 2, totalPages);
        i++
      ) {
        button.push(
          <Button
            size="small"
            variant={i !== currentPage ? "outlined" : "contained"}
            key={i}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </Button>
        );
      }

      if (totalPages > currentPage + 2) {
        button.push(<span style={{ color: "#1976d2" }}>...</span>);
        button.push(
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setCurrentPage(totalPages);
            }}
          >
            {totalPages}
          </Button>
        );
      }

      return button;
    } else if (currentPage === totalPages) {
      button.push(
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </Button>
      );

      button.push(<span style={{ color: "#1976d2" }}>...</span>);

      for (let i = currentPage - 2; i <= currentPage; i++) {
        button.push(
          <Button
            size="small"
            variant={i !== currentPage ? "outlined" : "contained"}
            key={i}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </Button>
        );
      }

      return button;
    }
  }

  function handleSearchDataChange(e) {
    setSearchData((searchData) => ({
      ...searchData,
      [e.target.name]: e.target.value,
    }));
  }

  function showSkeleton() {
    return (
      <center>
        <div style={{ height: "80vh" }}>
          <Skeleton
            sx={{
              backgroundColor: "#9E9FA5",
              width: "80vw",
              marginTop: "2em",
              height: "15%",
            }}
            variant="rounded"
            //   width={210}
          />
          <Skeleton
            sx={{
              backgroundColor: "#9E9FA5",
              width: "80vw",
              marginTop: "2em",
              height: "30%",
            }}
            variant="rounded"
          />
          <Skeleton
            sx={{
              backgroundColor: "#9E9FA5",
              width: "80vw",
              marginTop: "1em",
              height: "20%",
            }}
            variant="rounded"
          />
          <div>
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "0.1em",
                height: "7.5%%",
              }}
              variant="rounded"
            />
          </div>
        </div>
      </center>
    );
  }

  if (!allStudents || allStudents === []) {
    return showSkeleton();
  }

  function handleMultipleUpdate() {
    setApiCalled(true);
    if (bulkUpdate.semester === "" && bulkUpdate.department === "") {
      alert("Please provide atleaset one of the fields below to proceed.");
      setApiCalled(false);
      return;
    }

    //*updating in client rendering mode...
    setStudents((prev) =>
      prev.map((stu) => {
        if (selectedStudents.includes(stu)) {
          stu.semester =
            bulkUpdate.semester === "" ? stu.semester : bulkUpdate.semester;
          stu.department =
            bulkUpdate.department === ""
              ? stu.department
              : bulkUpdate.department;

          return stu;
        }
        return stu;
      })
    );

    //*updating in the server
    updateMultipleStudent(selectedStudents, bulkUpdate).then((res) => {
      setApiCalled(false);
      if (!res.successful) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setSelectedStudents([]);
      setBulkUpdate({
        department: "",
        semester: "",
      });
      setMultipleStudentAction(0);
    });
  }

  function handleMutipleDelete() {
    setApiCalled(true);
    setAllStudents((prev) =>
      prev.filter((stu) => !selectedStudents.includes(stu))
    );
    deleteMultipleStudents(selectedStudents).then((res) => {
      setApiCalled(false);
      if (!res.successful) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setSelectedStudents([]);
      setBulkUpdate({
        department: "",
        semester: "",
      });
      setMultipleStudentAction(0);
    });
  }

  function handleSingleStudentDelete() {
    setApiCalled(true);
    setAllStudents((prev) =>
      prev.filter(
        (stu) =>
          stu.email !== editStudent.email &&
          stu.rollNumber !== editStudent.rollNumber
      )
    );
    deleteSingleStudent(editStudent)
      .then((res) => {
        setApiCalled(false);
        if (!res.successful) {
          alert(res.message);
          return;
        }
        alert(res.message);
        handleCloseBackdrop();
      })
      .catch((err) => {
        alert(err.message);
        setApiCalled(false);
        return;
      });
  }
  function handleSingleStudentEdit() {
    //!checking if any thing is changed or not...
    if (editStudent === modifiedStudentData) {
      const userResponse = window.confirm(
        "No changes in student data detcted. Close the backdrop ?"
      );
      if (userResponse === true) {
        handleCloseBackdrop();
        return;
      }
    }

    //! updathing the backend or server side...
    updateSingleStudent(editStudent, modifiedStudentData)
      .then((res) => {
        setApiCalled(false);
        if (!res.successful) {
          alert(res.message);
          return;
        }
        alert(res.message);
        //*changeing data in frontend side...
        students[students.indexOf(editStudent)] = modifiedStudentData;
        handleCloseBackdrop();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleSearch() {
    setAllStudents(() =>
      studentsFromDB.filter(
        (student) =>
          student.name.includes(searchData.name) &&
          student.rollNumber.includes(searchData.rollNumber) &&
          student.department.includes(searchData.department)
      )
    );
    if (searchData.semester !== "") {
      setAllStudents((prev) =>
        prev.filter((student) => student.semester === searchData.semester)
      );
    }
  }

  function handleCloseBackdrop() {
    setMultipleStudentAction(0);
    setSingleStudentAction(0);
    setEditStudent(null);
    setBulkUpdate({
      semester: "",
      department: "",
    });
  }

  return (
    <>
      <div className="homepage">
        <div className="heading">See/Edit/Delete Student(s) </div>
        <div className="search-container">
          <Paper
            sx={{ width: "100%", height: "100%" }}
            className="search-component"
            elevation={6}
          >
            <div style={{ width: "100%" }} className="container">
              <div
                className="form-container"
                style={{
                  padding: "0.5em 0.75em 0 0.75em",
                }}
              >
                <div style={{ gap: "0.75em" }} className="row">
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
                    label="Semester"
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
                    label="Department"
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
                  <Button
                    sx={{
                      marginTop: "0.8em",
                      padding: "0.25em 0.5em",
                      width: "20%",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setSearchData(() => ({
                        name: "",
                        semester: "",
                        department: "",
                        rollNumber: "",
                      }));
                      handleSearch();
                    }}
                    color="warning"
                    size="small"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </div>

        <div className="table">
          <TableContainer component={Paper}>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                {selectedStudents.length !== 0 && (
                  <>
                    <TableRow sx={{ backgroundColor: " #9EB384" }}>
                      <TableCell colSpan={6} rowSpan={2}>
                        {`${selectedStudents.length} Student${
                          selectedStudents.length === 1 ? "" : "s"
                        } selected.`}
                      </TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: " #9EB384" }}>
                      <TableCell sx={{ width: "10%" }}>
                        <Button
                          color="warning"
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setMultipleStudentAction(1);
                          }}
                        >
                          <EditTwoToneIcon />
                        </Button>
                      </TableCell>
                      <TableCell sx={{ width: "10%" }}>
                        <Button
                          color="error"
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setMultipleStudentAction(2);
                          }}
                        >
                          <DeleteForeverTwoToneIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                )}
                <TableRow sx={{ backgroundColor: " #9EB384", height: "3em" }}>
                  <TableCell sx={{ width: "12%" }}>
                    <Checkbox
                      id="selectMultiple"
                      checked={selectAll.includes(currentPage)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!selectAll.includes(currentPage)) {
                            setSelectAll((prev) => [...prev, currentPage]);
                          }

                          setSelectedStudents((s) => [
                            ...new Set([...s, ...students]),
                          ]);
                        }
                        if (!e.target.checked) {
                          setSelectAll(
                            selectAll.filter((s) => s !== currentPage)
                          );
                        }
                      }}
                      size="small"
                    />
                    Select
                  </TableCell>
                  <TableCell sx={{ width: "10%" }}>S. No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length !== 0 ? (
                  students.map((student, idx) => {
                    return (
                      <TableRow
                        key={student.rollNumber}
                        className="table-hover-effect"
                      >
                        <TableCell>
                          <Checkbox
                            size="small"
                            checked={selectedStudents.includes(student)}
                            onClick={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents((stu) => [...stu, student]);
                              } else {
                                setSelectedStudents((stu) =>
                                  stu.filter(
                                    (s) => s.rollNumber !== student.rollNumber
                                  )
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.semester}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell sx={{ width: "15%" }}>
                          <div className="row">
                            <Button
                              color="warning"
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setEditStudent(() => student);
                                setModifiedStudentData(() => student);
                                setSingleStudentAction(1);
                              }}
                            >
                              <EditTwoToneIcon />
                            </Button>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setEditStudent(() => student);
                                setModifiedStudentData(() => student);
                                setSingleStudentAction(2);
                              }}
                            >
                              <DeleteForeverTwoToneIcon />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={8}>
                        No Data Found For The Given Search Data.
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {totalPages !== 0 ? (
          <div className="pages-button">
            {totalPages !== 1 && (
              <Button
                size="small"
                disabled={currentPage === 1}
                className="next-prev"
                onClick={handlePrevClick}
              >
                Prev
              </Button>
            )}
            {renderButtons()}
            {totalPages !== 1 && (
              <Button
                size="small"
                className="next-prev"
                disabled={currentPage === totalPages}
                onClick={handleNextClick}
              >
                Next
              </Button>
            )}
          </div>
        ) : (
          <center>
            <Skeleton
              sx={{
                backgroundColor: "#9E9FA5",
                width: "80vw",
                marginTop: "1em",
                height: "20%",
              }}
              variant="rounded"
            />
          </center>
        )}
      </div>
      {/* BACKDROP FOR MULTIPLE STUDENT EDITING AND DELETING  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={multipleStudentAction === 1 || multipleStudentAction === 2}
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
          {multipleStudentAction === 1 ? (
            <div>
              <div className="backdrop-heading">Edit Multiple Students</div>
              <div className="backdrop-options-column">
                <TextField
                  name="semester"
                  select
                  label="Semester"
                  helperText="Please select semester."
                  onChange={(e) => {
                    setBulkUpdate((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  value={bulkUpdate?.semester}
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
                  label="Department"
                  helperText="Please select department."
                  onChange={(e) => {
                    setBulkUpdate((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  value={bulkUpdate?.department}
                >
                  {department.map((dept, idx) => (
                    <MenuItem value={dept} key={idx}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="caption">
                  Only Semester & Department can be edited for more than one
                  students.
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleMultipleUpdate}
                  disabled={apiCalled}
                >
                  Make Changes
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleCloseBackdrop}
                  disabled={apiCalled}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="backdrop-options-column">
                <div className="message">
                  Are you sure you want to remove {selectedStudents.length}{" "}
                  student{selectedStudents.length > 1 && "s"} from the database.
                  <br />
                  <Typography
                    sx={{ color: "#252B48" }}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    * The changes can not be reverted back. Please check before
                    making changes.
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleMutipleDelete}
                  disabled={apiCalled}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleCloseBackdrop}
                  disabled={apiCalled}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </Backdrop>

      {/* BACKDROP FOR SINGLE STUDENT EDITING AND DELETING */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={singleStudentAction === 1 || singleStudentAction === 2}
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
          {singleStudentAction === 1 ? (
            <div>
              <div className="backdrop-heading">Edit Student</div>
              <div className="backdrop-options-column">
                <TextField
                  label="Name"
                  name="name"
                  value={modifiedStudentData.name}
                  onChange={(e) => {
                    setModifiedStudentData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={modifiedStudentData.email}
                  onChange={(e) => {
                    setModifiedStudentData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="Roll Number"
                  name="rollNumber"
                  value={modifiedStudentData.rollNumber}
                  onChange={(e) => {
                    setModifiedStudentData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <div className="row">
                  <TextField
                    name="semester"
                    select
                    label="Semester"
                    helperText="Please select semester."
                    fullWidth
                    onChange={(e) => {
                      setModifiedStudentData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedStudentData.semester}
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
                    label="Department"
                    helperText="Please select semester."
                    fullWidth
                    onChange={(e) => {
                      setModifiedStudentData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedStudentData.department}
                  >
                    {department.map((dept, idx) => (
                      <MenuItem value={dept} key={idx}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <Typography
                  sx={{ color: "#252B48" }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  * The changes can not be reverted back. Please check before
                  making changes.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleSingleStudentEdit}
                  disabled={apiCalled}
                >
                  Make Changes
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  onClick={handleCloseBackdrop}
                  disabled={apiCalled}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            singleStudentAction === 2 && (
              <>
                <div className="backdrop-options-column">
                  <div className="message">
                    Are you sure you want to remove '{editStudent.name}' with
                    roll number '{editStudent.rollNumber}' from the database.
                    <br />
                    <Typography
                      sx={{ color: "#252B48" }}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      * The changes can not be reverted back. Please check
                      before making deleting.
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleSingleStudentDelete}
                    disabled={apiCalled}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleCloseBackdrop}
                    disabled={apiCalled}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </Backdrop>
    </>
  );
}
