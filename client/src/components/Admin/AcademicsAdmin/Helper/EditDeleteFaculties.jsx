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
  deleteMultipleFaculties,
  deleteSingleFaculty,
  getAllFaculties,
  updateSingleFaculty,
} from "../../../../services/faculty";
export default function EditDeleteFaculties() {
  const [facultiesFromDB, setFacultiesFromDB] = useState([]);
  const [allFaculties, setAllFaculties] = useState([]);
  const department = [
    "",
    "All",
    "CSE",
    "CIVIL",
    "EE",
    "EEE",
    "ETC",
    "IT",
    "MECH",
  ];
  const [faculties, setFaculties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchData, setSearchData] = useState({
    name: "",
    semester: "",
    empId: "",
    department: "",
  });
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  const [multipleFacultiesAction, setMultipleFacultiesAction] = useState(0);
  const [singleFacultyAction, setSingleFacultyAction] = useState(0);
  const [apiCalled, setApiCalled] = useState(false);
  const [editFactulty, setEditFaculty] = useState(null);
  const [modifiedFacultyData, setModifiedFacultyData] = useState(null);

  useEffect(() => {
    if (facultiesFromDB.length === 0) {
      getAllFaculties().then((res) => {
        if (res.successful === false) {
          alert(res.message);
          return;
        }
        setFacultiesFromDB(res.faculties);
        setAllFaculties(res.faculties);
        setCurrentPage(1);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allFaculties !== []) {
      setTotalPages(Math.ceil(allFaculties.length / itemsPerPage));
      const start = itemsPerPage * (currentPage - 1);
      const end = Math.min(itemsPerPage * currentPage, allFaculties.length);
      setFaculties(() => [...allFaculties.slice(start, end)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFaculties, currentPage, totalPages]);

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

  if (!allFaculties || allFaculties === []) {
    return showSkeleton();
  }

  function handleMutipleDelete() {
    setApiCalled(true);
    setAllFaculties((prev) =>
      prev.filter((stu) => !selectedFaculties.includes(stu))
    );
    deleteMultipleFaculties(selectedFaculties).then((res) => {
      setApiCalled(false);
      if (!res.successful) {
        alert(res.message);
        return;
      }
      alert(res.message);
      setSelectedFaculties([]);

      setMultipleFacultiesAction(0);
    });
  }

  function handleSingleFacultyDelete() {
    setApiCalled(true);
    setAllFaculties((prev) =>
      prev.filter(
        (stu) =>
          stu.email !== editFactulty.email && stu.empId !== editFactulty.empId
      )
    );
    deleteSingleFaculty(editFactulty)
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
  function handleSingleFacultyEdit() {
    //!checking if any thing is changed or not...
    if (editFactulty === modifiedFacultyData) {
      const userResponse = window.confirm(
        "No changes in student data detcted. Close the backdrop ?"
      );
      if (userResponse === true) {
        handleCloseBackdrop();
        return;
      }
    }

    //! updathing the backend or server side...
    updateSingleFaculty(editFactulty, modifiedFacultyData)
      .then((res) => {
        setApiCalled(false);
        if (!res.successful) {
          alert(res.message);
          return;
        }
        alert(res.message);
        //*changeing data in frontend side...
        faculties[faculties.indexOf(editFactulty)] = modifiedFacultyData;
        handleCloseBackdrop();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleSearch() {
    setAllFaculties(() =>
      facultiesFromDB.filter(
        (faculty) =>
          faculty.name.includes(searchData.name) &&
          faculty.department.includes(searchData.department) &&
          faculty.empId.includes(searchData.empId)
      )
    );
  }

  function handleCloseBackdrop() {
    setMultipleFacultiesAction(0);
    setSingleFacultyAction(0);
    setEditFaculty(null);
  }

  return (
    <>
      <div className="homepage">
        <div className="heading">See/Edit/Delete Faculties </div>
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
                    label="Employee ID"
                    name="empId"
                    onChange={handleSearchDataChange}
                    value={searchData?.empId}
                  />

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
                      <MenuItem value={dept === "All" ? "" : dept} key={idx}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
          </Paper>
        </div>

        <div className="table">
          <TableContainer component={Paper}>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                {selectedFaculties.length !== 0 && (
                  <>
                    <TableRow sx={{ backgroundColor: " #9EB384" }}>
                      <TableCell colSpan={6} rowSpan={2}>
                        {`${selectedFaculties.length} Student${
                          selectedFaculties.length === 1 ? "" : "s"
                        } selected.`}
                      </TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: " #9EB384" }}>
                      <TableCell sx={{ width: "10%" }}>
                        <Button
                          color="error"
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setMultipleFacultiesAction(2);
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

                          setSelectedFaculties((s) => [
                            ...new Set([...s, ...faculties]),
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
                  <TableCell>Email</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faculties.length !== 0 ? (
                  faculties.map((faculty, idx) => {
                    return (
                      <TableRow
                        key={faculty.empId}
                        className="table-hover-effect"
                      >
                        <TableCell>
                          <Checkbox
                            size="small"
                            checked={selectedFaculties.includes(faculty)}
                            onClick={(e) => {
                              if (e.target.checked) {
                                setSelectedFaculties((fact) => [
                                  ...fact,
                                  faculty,
                                ]);
                              } else if (!e.target.checked) {
                                setSelectedFaculties((fact) =>
                                  fact.filter((f) => f.empId !== faculty.empId)
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </TableCell>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{faculty.email}</TableCell>
                        <TableCell>{faculty.empId}</TableCell>
                        <TableCell>{faculty.department}</TableCell>
                        <TableCell sx={{ width: "15%" }}>
                          <div className="row">
                            <Button
                              color="warning"
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setEditFaculty(() => faculty);
                                setModifiedFacultyData(() => faculty);
                                setSingleFacultyAction(1);
                              }}
                            >
                              <EditTwoToneIcon />
                            </Button>
                            <Button
                              color="error"
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setEditFaculty(() => faculty);
                                setModifiedFacultyData(() => faculty);
                                setSingleFacultyAction(2);
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
        open={multipleFacultiesAction === 1 || multipleFacultiesAction === 2}
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
          (
          <>
            <div className="backdrop-options-column">
              <div className="message">
                Are you sure you want to remove {selectedFaculties.length}{" "}
                student{selectedFaculties.length > 1 && "s"} from the database.
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
        </div>
      </Backdrop>

      {/* BACKDROP FOR SINGLE STUDENT EDITING AND DELETING */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={singleFacultyAction === 1 || singleFacultyAction === 2}
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
          {singleFacultyAction === 1 ? (
            <div>
              <div className="backdrop-heading">Edit Student</div>
              <div className="backdrop-options-column">
                <TextField
                  label="Name"
                  name="name"
                  value={modifiedFacultyData.name}
                  onChange={(e) => {
                    setModifiedFacultyData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={modifiedFacultyData.email}
                  onChange={(e) => {
                    setModifiedFacultyData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <TextField
                  label="Employee ID"
                  name="empId"
                  value={modifiedFacultyData.empId}
                  onChange={(e) => {
                    setModifiedFacultyData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <div className="row">
                  <TextField
                    name="department"
                    select
                    label="Department"
                    helperText="Please select semester."
                    fullWidth
                    onChange={(e) => {
                      setModifiedFacultyData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={modifiedFacultyData.department}
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
                  onClick={handleSingleFacultyEdit}
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
            singleFacultyAction === 2 && (
              <>
                <div className="backdrop-options-column">
                  <div className="message">
                    Are you sure you want to remove '{editFactulty.name}' with
                    employee id '{editFactulty.empId}' from the database.
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
                    onClick={handleSingleFacultyDelete}
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
