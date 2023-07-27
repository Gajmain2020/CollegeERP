import {
  Alert,
  Backdrop,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteSingleAnnouncement,
  draftAnnouncement,
  draftAnnouncementPublish,
  fetchAllAnnouncements,
  fetchAllDraftedAnnouncements,
  publishAnnouncement,
  publishEditedAnnouncement,
} from "../../../services/announcement";
import { checkForToken, decodeToken } from "../../../services/common";
import { useNavigate } from "react-router-dom";

export default function AnnouncementAdmin({ id }) {
  const navigate = useNavigate();
  const options = [
    "All",
    "Library",
    "Announcements",
    "Exam",
    "Accounts",
    "All Academic Branches",
    "CSE",
    "CIVIL",
    "EE",
    "EEE",
    "ETC",
    "IT",
    "MECH",
  ];
  const initialDraftData = {
    announcementNumber: "",
    announcementTitle: "",
    announcementDepartment: "All",
    announcementSubject: "",
    announcementText: "",
  };
  const itemsPerPage = 10;
  const [draftData, setDraftData] = useState(initialDraftData);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [option, setOption] = useState("");
  const [apiCalled, setApiCalled] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [publishOption, setPublishOption] = useState("");
  const [draftedAnnouncements, setDraftedAnnouncements] = useState(null);
  const [publishing, setPublishing] = useState(null);
  const [enableEditing, setEnableEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    checkForToken()
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.tokenExists === false) {
          navigate("/not-logged-in");
        }
        return decodeToken(res.token);
      })
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => setErrorMessage(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (option !== "") {
      const unloadCallback = (event) => {
        event.preventDefault();
        event.returnValue = "";
        return "";
      };

      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
    }
  }, [option]);

  function handleDeleteAnnouncementClick() {
    setOption(() => "Delete");
    fetchAllAnnouncements().then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        setApiCalled(false);
        return;
      }
      setTotalPages(Math.ceil(res.announcements.length / itemsPerPage));
      setDraftedAnnouncements(res.announcements);
      setTotalPages(Math.ceil(res.announcements.length / itemsPerPage));
      setApiCalled(false);
      return;
    });
  }
  function handleComplaintsClick() {
    setOption(() => "Complaints");
  }
  function handleDraftAnnouncementClick() {
    setOption(() => "Draft");
  }
  function handlePublishAnnouncementClick() {
    setOption(() => "Publish");
  }

  function handleSaveDraftClick() {
    if (
      draftData.announcementDepartment === "" ||
      draftData.announcementNumber === "" ||
      draftData.announcementSubject === "" ||
      draftData.announcementText === "" ||
      draftData.announcementTitle === ""
    ) {
      setErrorMessage("Please Fill Out All The Fields.");
      return;
    }
    setApiCalled(true);
    draftAnnouncement(draftData, userDetails)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setApiCalled(false);
          return;
        }
        setSuccessMessage(res.message);
        setDraftData(initialDraftData);
        setApiCalled(false);
        setOption("");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    setApiCalled(false);
  }

  function fetchDraftAnnouncement() {
    setApiCalled(true);
    fetchAllDraftedAnnouncements().then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        setApiCalled(false);
      }
      setDraftedAnnouncements(res.announcements);
      setApiCalled(false);
    });
  }

  function handlePublishAnnouncement() {
    if (
      draftData.announcementDepartment === "" ||
      draftData.announcementNumber === "" ||
      draftData.announcementSubject === "" ||
      draftData.announcementText === "" ||
      draftData.announcementTitle === ""
    ) {
      setErrorMessage("Please Fill Out All The Fields.");
      return;
    }
    setApiCalled(true);
    publishAnnouncement(draftData, userDetails)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setApiCalled(false);
          return;
        }
        setSuccessMessage(res.message);
        setDraftData(initialDraftData);
        setApiCalled(false);
        setPublishOption("");
        setOption("");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    setApiCalled(false);
  }

  function handleEditedDraftPublish() {
    if (
      draftData.announcementDepartment === "" ||
      draftData.announcementNumber === "" ||
      draftData.announcementSubject === "" ||
      draftData.announcementText === "" ||
      draftData.announcementTitle === ""
    ) {
      setErrorMessage("Please Fill Out All The Fields.");
      return;
    }

    setApiCalled(true);
    publishEditedAnnouncement(draftData)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setApiCalled(false);
          return;
        }
        setSuccessMessage(res.message);
        setDraftData(initialDraftData);
        setEnableEditing(false);
        setPublishing(null);
        setApiCalled(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setApiCalled(false);
      });
    setApiCalled(false);
  }

  function handlePublishDraftAnnouncement() {
    draftAnnouncementPublish(publishing).then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        setApiCalled(false);
        return;
      }
      setSuccessMessage(res.message);
      setDraftedAnnouncements((announcements) =>
        announcements.filter(
          (announcement) => announcement._id !== publishing._id
        )
      );

      setPublishing(false);
      setApiCalled(false);
    });
  }

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
    for (let i = 1; i <= totalPages; i++) {
      button.push(
        <Button
          size="small"
          variant={i !== currentPage ? "outlined" : "contained"}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      );
    }
    return button;
  }

  function deleteAnnoucement(announcement) {
    const confirmation = window.confirm(
      "Are you sure you want to delete announcement ?"
    );
    if (confirmation === false) {
      return;
    }
    setApiCalled(true);
    deleteSingleAnnouncement(announcement)
      .then((res) => {
        if (res.successful === false) {
          setApiCalled(false);
          return;
        }
        setDraftedAnnouncements((announcements) =>
          announcements.filter((announc) => announc._id !== announcement._id)
        );
        setApiCalled(false);
        setSuccessMessage(res.message);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setApiCalled(false);
        return;
      });
  }

  function renderTableRows() {
    const rows = [];
    for (
      let i = itemsPerPage * (currentPage - 1);
      i < draftedAnnouncements.length && i < currentPage * itemsPerPage;
      i++
    ) {
      rows.push(
        <TableRow className="table-row" key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{draftedAnnouncements[i].announcementNumber}</TableCell>
          <TableCell>{draftedAnnouncements[i].announcementTitle}</TableCell>
          <TableCell>{draftedAnnouncements[i].announcementSubject}</TableCell>
          <TableCell>
            {draftedAnnouncements[i].announcementDepartment}
          </TableCell>
          <TableCell>
            {format(
              new Date(draftedAnnouncements[i].announcementDraftDate),
              "dd-mm-yyyy"
            )}
          </TableCell>
          <TableCell>{draftedAnnouncements[i].creatorName}</TableCell>
          <TableCell>
            <Button onClick={() => deleteAnnoucement(draftedAnnouncements[i])}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    }
    return rows;
  }

  return (
    <>
      <div className="main-container homepage">
        <Snackbar
          open={successMessage !== ""}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert
            onClose={() => setSuccessMessage("")}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={4000}
          onClose={() => setErrorMessage("")}
        >
          <Alert
            onClose={() => setErrorMessage("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
          className="heading"
        >
          Welcome Admin
        </m.div>
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
        >
          <div className="button-container">
            <div className="button-row">
              <Button
                disabled={option !== "" && option !== "Publish"}
                onClick={handlePublishAnnouncementClick}
                fullWidth
              >
                Publish Announcement
              </Button>
              <Button
                disabled={option !== "" && option !== "Draft"}
                onClick={handleDraftAnnouncementClick}
                fullWidth
              >
                Draft Announcement
              </Button>
            </div>
            <div className="button-row">
              <Button
                disabled={option !== "" && option !== "Delete"}
                onClick={handleDeleteAnnouncementClick}
                fullWidth
              >
                Delete Announcement
              </Button>
              <Button
                disabled={option !== "" && option !== "Complaints"}
                onClick={handleComplaintsClick}
                fullWidth
              >
                Complaints Resolution
              </Button>
            </div>
          </div>
        </m.div>
        {/* CLOSE BUTTON FOR THE OPTION CONTAINER */}
        {option !== "" && (
          <>
            <div className="modal-close-button">
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => {
                  setOption("");
                  setDraftData("");
                  setPublishOption("");
                }}
              >
                <CloseIcon fontSize="large" />
              </Button>
            </div>
          </>
        )}
        {/* PUBLISH DONE */}
        {option === "Publish" && (
          <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="announcement-modal"
          >
            <div className="option-container">
              <Button
                onClick={() => setPublishOption("New")}
                variant="contained"
                fullWidth
                disabled={publishOption !== "" && publishOption !== "New"}
              >
                Create New Announcement
              </Button>
              <Button
                onClick={() => {
                  fetchDraftAnnouncement();
                  setPublishOption("Old");
                }}
                variant="contained"
                fullWidth
                disabled={publishOption !== "" && publishOption !== "Old"}
              >
                Publish Drafted Announcement
              </Button>
            </div>

            {publishOption !== "" && (
              <div
                style={{ padding: "0", margin: "1em 0" }}
                className="modal-close-button"
              >
                <Button
                  onClick={() => setPublishOption("")}
                  variant="contained"
                  size="small"
                  color="error"
                >
                  Close
                </Button>
              </div>
            )}
            {publishOption === "New" && (
              <>
                <div className="container">
                  <div className="form-container">
                    <div className="row">
                      <TextField
                        required
                        fullWidth
                        onChange={(e) =>
                          setDraftData({
                            ...draftData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        name="announcementTitle"
                        label="Announcement Title"
                        value={draftData.announcementTitle}
                      />
                    </div>
                    <div className="row">
                      <TextField
                        required
                        onChange={(e) =>
                          setDraftData({
                            ...draftData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        name="announcementNumber"
                        fullWidth
                        label="Announcement Number"
                        value={draftData.announcementNumber}
                      />

                      <TextField
                        onChange={(e) =>
                          setDraftData({
                            ...draftData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        name="announcementDepartment"
                        select
                        label="Select Department"
                        helperText="Please select department"
                        fullWidth
                        defaultValue={"All"}
                        value={draftData.announcementDepartment}
                      >
                        {options.map((option) => (
                          <MenuItem value={option} key={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="row">
                      <TextField
                        required
                        onChange={(e) =>
                          setDraftData({
                            ...draftData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        fullWidth
                        label="Announcement Subject"
                        name="announcementSubject"
                        value={draftData.announcementSubject}
                      />
                    </div>
                    <div className="row">
                      <TextField
                        required
                        onChange={(e) =>
                          setDraftData({
                            ...draftData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        value={draftData.announcementText}
                        name="announcementText"
                        fullWidth
                        label="Announcement Text / Announcement Description "
                        multiline
                        rows={4}
                      />
                    </div>
                    <div className="row">
                      <Button
                        onClick={() => setDraftData(initialDraftData)}
                        fullWidth
                        color="warning"
                        variant="contained"
                      >
                        Reset
                      </Button>
                      <Button
                        fullWidth
                        color="success"
                        variant="contained"
                        onClick={handlePublishAnnouncement}
                        disabled={apiCalled}
                      >
                        Publish Announcement
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {publishOption === "Old" && (
              <>
                <div className="table-container">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "650px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: "1em" }}>S.No.</TableCell>
                          <TableCell sx={{ width: "20%" }}>
                            Announcement Number
                          </TableCell>
                          <TableCell>Announcement Title</TableCell>
                          <TableCell>Announcement Subject</TableCell>
                          <TableCell>Announcement Department</TableCell>
                          <TableCell>Draft Date</TableCell>
                          <TableCell>Creator</TableCell>
                          <TableCell>Publish</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <>
                          {draftedAnnouncements !== null &&
                            draftedAnnouncements.map((announcement, idx) => (
                              <TableRow className="table-row" key={idx}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>
                                  {announcement.announcementNumber}
                                </TableCell>
                                <TableCell>
                                  {announcement.announcementTitle}
                                </TableCell>
                                <TableCell>
                                  {announcement.announcementSubject}
                                </TableCell>
                                <TableCell>
                                  {announcement.announcementDepartment}
                                </TableCell>
                                <TableCell>
                                  {format(
                                    new Date(
                                      announcement.announcementDraftDate
                                    ),
                                    "dd-mm-yyyy"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {announcement.creatorName}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => setPublishing(announcement)}
                                    color="warning"
                                    variant="contained"
                                    size="small"
                                  >
                                    Publish
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </m.div>
        )}
        {publishing !== null && (
          <>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={publishing !== null}
            >
              <div className="backdrop-element">
                <div className="backdrop-close-btn">
                  <Button
                    onClick={() => {
                      setPublishing(null);
                      setDraftData(initialDraftData);
                      setEnableEditing(false);
                    }}
                    variant="contained"
                    size="small"
                    color="error"
                  >
                    Close
                  </Button>
                </div>
                <div className="backdrop-options-column">
                  {enableEditing === false ? (
                    <div className="read-only">
                      <div className="read-item">
                        <span className="data-heading">
                          Announcement Number
                        </span>
                        <span className="data-value">
                          {publishing.announcementNumber}
                        </span>
                      </div>
                      <div className="read-item">
                        <span className="data-heading">Announcement Title</span>
                        <span className="data-value">
                          {publishing.announcementTitle}
                        </span>
                      </div>
                      <div className="read-item">
                        <span className="data-heading">
                          Announcement Subject
                        </span>
                        <span className="data-value">
                          {publishing.announcementSubject}
                        </span>
                      </div>
                      <div className="read-item">
                        <span className="data-heading">
                          Announcement Draft Date
                        </span>
                        <span className="data-value">
                          {format(
                            new Date(publishing.announcementDraftDate),
                            "dd-mm-yyyy"
                          )}
                        </span>
                      </div>
                      <div className="read-item">
                        <span className="data-heading">
                          Announcement Creator
                        </span>
                        <span className="data-value">
                          {publishing.creatorName}
                        </span>
                      </div>
                      <div className="row">
                        <Button
                          onClick={() => {
                            setEnableEditing(true);
                            setDraftData(publishing);
                            setDraftedAnnouncements((announcements) =>
                              announcements.filter(
                                (ann) =>
                                  ann.announcementNumber !==
                                  publishing.announcementNumber
                              )
                            );
                          }}
                          fullWidth
                          variant="contained"
                          color="warning"
                        >
                          Edit
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          onClick={handlePublishDraftAnnouncement}
                        >
                          Publish
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="backdrop-options-column">
                        <TextField
                          name="announcementNumber"
                          onChange={(e) =>
                            setDraftData({
                              ...draftData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          label="Announcement Number"
                          value={draftData.announcementNumber}
                        />
                        <TextField
                          name="announcementTitle"
                          onChange={(e) =>
                            setDraftData({
                              ...draftData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          label="Announcement Title"
                          value={draftData.announcementTitle}
                        />
                        <TextField
                          name="announcementSubject"
                          onChange={(e) =>
                            setDraftData({
                              ...draftData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          label="Announcement Subject"
                          value={draftData.announcementSubject}
                        />
                        <TextField
                          onChange={(e) =>
                            setDraftData({
                              ...draftData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          name="announcementDepartment"
                          select
                          label="Select Department"
                          helperText="Please select department"
                          fullWidth
                          defaultValue={draftData.announcementDepartment}
                          value={draftData.announcementDepartment}
                        >
                          {options.map((option) => (
                            <MenuItem value={option} key={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          name="announcementText"
                          multiline
                          rows={4}
                          onChange={(e) =>
                            setDraftData({
                              ...draftData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          value={draftData.announcementText}
                          label="Announcement Text / Message"
                        />
                      </div>
                      <div className="caption">
                        <b>* Note ::</b>
                        Creator Name and Draft Date can not be changed while
                        editing the drafted announcement.
                      </div>
                      <div className="row">
                        <Button
                          onClick={() => {
                            setDraftData(initialDraftData);
                            setEnableEditing(false);
                            setDraftedAnnouncements((announcements) => [
                              ...announcements,
                              draftData,
                            ]);
                          }}
                          fullWidth
                          variant="outlined"
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={apiCalled}
                          onClick={handleEditedDraftPublish}
                          fullWidth
                          variant="contained"
                          color="success"
                        >
                          Publish
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Backdrop>
          </>
        )}
        {/* DRAFTING DONE */}
        {option === "Draft" && (
          <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container">
              <div className="form-container">
                <div className="row">
                  <TextField
                    required
                    fullWidth
                    onChange={(e) =>
                      setDraftData({
                        ...draftData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="announcementTitle"
                    label="Announcement Title"
                    value={draftData.announcementTitle}
                  />
                </div>
                <div className="row">
                  <TextField
                    required
                    onChange={(e) =>
                      setDraftData({
                        ...draftData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="announcementNumber"
                    fullWidth
                    label="Announcement Number"
                    value={draftData.announcementNumber}
                  />

                  <TextField
                    onChange={(e) =>
                      setDraftData({
                        ...draftData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="announcementDepartment"
                    select
                    label="Select Department"
                    helperText="Please select department"
                    fullWidth
                    defaultValue={"All"}
                    value={draftData.announcementDepartment}
                  >
                    {options.map((option) => (
                      <MenuItem value={option} key={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="row">
                  <TextField
                    required
                    onChange={(e) =>
                      setDraftData({
                        ...draftData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    fullWidth
                    label="Announcement Subject"
                    name="announcementSubject"
                    value={draftData.announcementSubject}
                  />
                </div>
                <div className="row">
                  <TextField
                    required
                    onChange={(e) =>
                      setDraftData({
                        ...draftData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    value={draftData.announcementText}
                    name="announcementText"
                    fullWidth
                    label="Announcement Text / Announcement Description "
                    multiline
                    rows={4}
                  />
                </div>
                <div className="row">
                  <Button
                    onClick={() => setDraftData(initialDraftData)}
                    fullWidth
                    color="warning"
                    variant="contained"
                  >
                    Reset
                  </Button>
                  <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={handleSaveDraftClick}
                    disabled={apiCalled}
                  >
                    Save As Draft
                  </Button>
                </div>
              </div>
            </div>
          </m.div>
        )}

        {/* DELETE ANNOUNCEMENT BOTH DRAFTED AND PUBLISHED */}
        {option === "Delete" && (
          <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
          >
            {/* ADD SEARCH COMPONENT */}
            <div className="table">
              {draftedAnnouncements === null ? (
                <div>
                  Fetching all the announcements. Please wait for sometime.
                </div>
              ) : (
                <div className="table-container">
                  <TableContainer component={Paper}>
                    <Table size="small" sx={{ minWidth: "650px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: "1em" }}>S.No.</TableCell>
                          <TableCell sx={{ width: "10%" }}>
                            Announcement Number
                          </TableCell>
                          <TableCell>Announcement Title</TableCell>
                          <TableCell>Announcement Subject</TableCell>
                          <TableCell>Announcement Department</TableCell>
                          <TableCell>Draft Date</TableCell>
                          <TableCell>Creator</TableCell>
                          <TableCell>Publish</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {renderTableRows()}
                        <>
                          {/* {draftedAnnouncements.map((announcement, idx) => (
                            <TableRow className="table-row" key={idx}>
                              <TableCell>{idx + 1}</TableCell>
                              <TableCell>
                                {announcement.announcementNumber}
                              </TableCell>
                              <TableCell>
                                {announcement.announcementTitle}
                              </TableCell>
                              <TableCell>
                                {announcement.announcementSubject}
                              </TableCell>
                              <TableCell>
                                {announcement.announcementDepartment}
                              </TableCell>
                              <TableCell>
                                {format(
                                  new Date(announcement.announcementDraftDate),
                                  "dd-mm-yyyy"
                                )}
                              </TableCell>
                              <TableCell>{announcement.creatorName}</TableCell>
                              <TableCell>
                                <Button>Delete</Button>
                              </TableCell>
                            </TableRow>
                          ))} */}
                        </>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </div>
            <div style={{ margin: "1em 0" }} className="pages-button">
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
          </m.div>
        )}
        {option === "Complaints" && (
          <m.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
          >
            this is this is complaint ye kaam baad me kabhi hoga bhai
          </m.div>
        )}
      </div>
    </>
  );
}
