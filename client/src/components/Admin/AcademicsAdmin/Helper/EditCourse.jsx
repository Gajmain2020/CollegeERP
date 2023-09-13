import { useEffect, useState } from "react";
import {
  deleteSingleCourse,
  getAllCourse,
  updateSingleCourse,
} from "../../../../services/department";
import {
  Paper,
  Skeleton,
  TextField,
  Button,
  MenuItem,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Backdrop,
  Typography,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import CloseIcon from "@mui/icons-material/Close";

export default function EditCourse() {
  const itemsPerPage = 20;
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const [coursesFromDB, setCoursesFromDB] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchData, setSearchData] = useState({
    courseName: "",
    department: "",
    courseCode: "",
    semester: "",
    courseType: "",
  });

  const [apiCalled, setApiCalled] = useState(false);
  const [singleCourseAction, setSingleCourseAction] = useState(0);
  const [editCourse, setEditCourse] = useState(null);
  const [modifiedEditCourse, setModifiedEditCourse] = useState(null);

  useEffect(() => {
    document.title = "Edit Course";

    if (coursesFromDB.length === 0) {
      getAllCourse().then((res) => {
        if (res.successful === false) {
          alert(res.message);
          return;
        }

        const pushThis = [];
        for (let i = 0; i < res.course.length; i++) {
          res.course[i].courses.map((c) => {
            pushThis.push({ ...c, department: res.course[i].department });
          });
        }

        setCoursesFromDB((prev) => [...pushThis]);
        setAllCourses((prev) => [...pushThis]);
        setCurrentPage(1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allCourses !== []) {
      setTotalPages(Math.ceil(allCourses.length / itemsPerPage));
      const start = itemsPerPage * (currentPage - 1);
      const end = Math.min(itemsPerPage * currentPage, allCourses.length);
      setCourses(() => [...allCourses.slice(start, end)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCourses, currentPage, totalPages]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

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

  function handleSearch() {
    setAllCourses(() =>
      coursesFromDB.filter(
        (course) =>
          course.courseName.includes(searchData.courseName) &&
          course.courseCode.includes(searchData.courseCode) &&
          course.department.includes(searchData.department)
      )
    );
    if (searchData.semester !== "") {
      setAllCourses((prev) =>
        prev.filter((course) => course.semester === searchData.semester)
      );
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

  if (!allCourses || allCourses === []) {
    return showSkeleton();
  }

  function handleCloseBackdrop() {
    setSingleCourseAction(0);
    setEditCourse(null);
    setModifiedEditCourse(null);
  }

  function handleSingleCourseEdit() {
    if (editCourse === modifiedEditCourse) {
      const userResponse = window.confirm(
        "No changes in course data detcted. Close the backdrop?"
      );
      if (userResponse === true) {
        handleCloseBackdrop();
        return;
      }
    }
    setApiCalled(true);
    updateSingleCourse(editCourse, modifiedEditCourse).then((res) => {
      setApiCalled(false);
      if (res.successful === false) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setApiCalled(false);
      courses[courses.indexOf(editCourse)] = modifiedEditCourse;
      handleCloseBackdrop();
    });
  }

  function handleSingleCourseDelete() {
    setApiCalled(true);
    setAllCourses((prev) =>
      prev.filter((cou) => editCourse.courseCode !== cou.courseCode)
    );
    deleteSingleCourse(editCourse)
      .then((res) => {
        setApiCalled(false);
        if (res.successful === false) {
          alert(res.message);
          return;
        }
        alert(res.message);
        handleCloseBackdrop();
        return;
      })
      .catch((err) => alert(err.message));
  }

  return (
    <>
      <div className="homepage">
        <div className="heading">Edit Course(s)</div>
        <div className="search-container">
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="search-component"
            elevation={6}
          >
            <div className="container" sx={{ width: "100%" }}>
              <div
                className="form-container"
                style={{
                  padding: "0.5em 0.75em 0 0.75em",
                }}
              >
                <div style={{ gap: "1em" }} className="row">
                  <TextField
                    fullWidth
                    label="Course Name"
                    name="courseName"
                    onChange={handleSearchDataChange}
                    value={searchData?.courseName}
                  />
                  <TextField
                    fullWidth
                    label="Course Code"
                    name="courseCode"
                    onChange={handleSearchDataChange}
                    value={searchData?.courseCode}
                  />
                  <TextField
                    name="semester"
                    select
                    label="Semester"
                    fullWidth
                    helperText="Please select semester."
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
                    fullWidth
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
                      marginTop: "0.8em",
                      padding: "0.25em 0.5em",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setSearchData(() => ({
                        courseName: "",
                        courseType: "",
                        semester: "",
                        department: "",
                        courseCode: "",
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
                <TableRow sx={{ backgroundColor: " #9EB384", height: "3em" }}>
                  <TableCell sx={{ width: "10%" }}>S. No.</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Course Type</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.length !== 0 ? (
                  courses.map((course, idx) => {
                    return (
                      <TableRow key={idx} className="table-hover-effect">
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell>{course.courseType}</TableCell>
                        <TableCell sx={{ width: "15%" }}>
                          <div className="row">
                            <Button
                              color="warning"
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setEditCourse(course);
                                setModifiedEditCourse(course);
                                setSingleCourseAction(1);
                              }}
                            >
                              <EditTwoToneIcon />
                            </Button>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setEditCourse(course);
                                setModifiedEditCourse(course);
                                setSingleCourseAction(2);
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

      {/* BACKDROP FOR SINGLE COURSE EDITING AND DELETING */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={singleCourseAction === 1 || singleCourseAction === 2}
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
          {singleCourseAction === 1 ? (
            <div>
              <div className="backdrop-heading">Edit Course</div>
              <div className="backdrop-options-column">
                <TextField
                  label="Course Name"
                  name="courseName"
                  value={modifiedEditCourse.courseName}
                  onChange={(e) => {
                    setModifiedEditCourse((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="Course Code"
                  name="courseCode"
                  value={modifiedEditCourse.courseCode}
                  onChange={(e) => {
                    setModifiedEditCourse((prev) => ({
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
                      setModifiedEditCourse((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedEditCourse.semester}
                  >
                    {semester.map((sem, idx) => (
                      <MenuItem value={sem} key={idx}>
                        {sem}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="courseType"
                    select
                    label="Course Type"
                    helperText="Please select course type."
                    fullWidth
                    onChange={(e) => {
                      setModifiedEditCourse((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedEditCourse.courseType}
                  >
                    <MenuItem value="theory">Theory</MenuItem>
                    <MenuItem value="lab">Lab.</MenuItem>
                  </TextField>
                  <TextField
                    name="department"
                    disabled
                    select
                    label="Department"
                    helperText="Please select semester."
                    fullWidth
                    onChange={(e) => {
                      setModifiedEditCourse((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedEditCourse.department}
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
                  onClick={handleSingleCourseEdit}
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
            singleCourseAction === 2 && (
              <>
                <div className="backdrop-options-column">
                  <div className="message">
                    Are you sure you want to remove '{editCourse.courseName}'
                    with course id '{editCourse.courseCode}' from the database.
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
                    onClick={handleSingleCourseDelete}
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
