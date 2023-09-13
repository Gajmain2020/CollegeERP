import { Backdrop, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AdminHomepage() {
  document.title = "Welcome Admin !!";
  const [openAddAdminBackdrop, setOpenAdminBackdrop] = useState(false);
  const [openAddNewAdminBackdrop, setOpenAddNewAdminBackdrop] = useState(false);
  const options = [
    "Library",
    "Announcements",
    "Exam",
    "Accounts",
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
    userId: "",
  };

  const [newAdminData, setNewAdminData] = useState(initialState);

  function handleAddAdminDataChange(e) {
    setNewAdminData({ ...newAdminData, [e.target.name]: e.target.value });
  }

  function handleCloseBackdrop() {
    setOpenAdminBackdrop(false);
  }
  function handleCloseOpenAddNewAdminBackdrop() {
    setOpenAdminBackdrop(false);
    setOpenAddNewAdminBackdrop(false);
  }

  function handleAddAdminClick() {
    setOpenAdminBackdrop(false);
    setOpenAddNewAdminBackdrop(true);
  }

  function handleAddNewAdmin() {
    console.log(newAdminData);
  }

  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() => setOpenAdminBackdrop(true)}
            variant="contained"
            fullWidth
            size="small"
          >
            Add Admin
          </Button>

          <Button variant="contained" fullWidth size="small">
            Course Management System
          </Button>
        </div>
        <div className="button-row">
          <Button variant="contained" fullWidth size="small">
            Student Section
          </Button>
          <Button variant="contained" fullWidth size="small">
            Teacher Section
          </Button>
        </div>
        <div className="button-row">
          <Button variant="contained" fullWidth size="small">
            Time Table Management
          </Button>
          <Button variant="contained" fullWidth size="small">
            Complaints
          </Button>
        </div>
        <div className="button-row">
          <Button variant="contained" fullWidth size="small">
            Library Management
          </Button>
          <Button variant="contained" fullWidth size="small">
            Add / Edit Notice
          </Button>
        </div>
      </div>
      {/* backdrop1 for option */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddAdminBackdrop}
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
            <Button
              onClick={handleAddAdminClick}
              fullWidth
              variant="contained"
              color="success"
            >
              Add New Admin
            </Button>
            <Button fullWidth idth variant="contained" color="warning">
              View OR Edit Existing Admin
            </Button>
          </div>
        </div>
      </Backdrop>

      {/* backdrop2 for adding new admin  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAddNewAdminBackdrop}
      >
        <div className="backdrop-element">
          <div className="backdrop-close-btn">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleCloseOpenAddNewAdminBackdrop}
            >
              <CloseIcon fontSize="large" />
            </Button>
          </div>
          <div className="backdrop-options-column">
            <TextField
              label="Name"
              onChange={handleAddAdminDataChange}
              name="name"
              fullWidth
            />
            <TextField
              onChange={handleAddAdminDataChange}
              label="Email"
              name="email"
              fullWidth
            />
            <TextField
              onChange={handleAddAdminDataChange}
              select
              label="Select Department"
              defaultValue=""
              helperText="Please select department"
              name="department"
            >
              {options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={handleAddAdminDataChange}
              label="UserId"
              name="userId"
            />
            <Button
              onClick={handleAddNewAdmin}
              variant="contained"
              color="success"
              size="large"
            >
              SAVE
            </Button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
