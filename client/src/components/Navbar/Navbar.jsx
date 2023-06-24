import { useNavigate } from "react-router-dom";
import brandLogo from "../../Images/brand logo.png";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { getAdminData } from "../../services/admin";
import { updateUser } from "../../services/common";

export default function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [disabelSaveButton, setDisableSaveButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const [openUpdateProfileBackdrop, setOpenUpdateProfileBackdrop] =
    useState(false);

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    setData(token ? jwtDecode(token) : null);
  }, [token]);

  // const data = token ? jwtDecode(token) : null;

  function handleAdminButtonClick() {
    navigate("/admin-login");
  }

  function handleBrandLogoClick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/");
  }
  function handleSignupClick() {
    alert("SignUp Button Clicked");
  }

  const [anchorElUser, setAnchorElUser] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  function getData(id) {
    if (data.userType === "admin") {
      getAdminData(id)
        .then((res) => setReceivedData(res))
        .catch((err) => console.log(err));
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    setData(null);
    navigate("/");
    return;
  }

  function handleChange(e) {
    setReceivedData({ ...receivedData, [e.target.name]: e.target.value });
    console.log(receivedData);
    setErrorMessage("");
    setDisableSaveButton(false);
  }

  function handleSaveChangesClick() {
    setDisableSaveButton(true);
    if (receivedData?.oldPassword === "") {
      setErrorMessage("Please Enter Old Password");
      setDisableSaveButton(false);
      return;
    }
    updateUser(data.userType, receivedData)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setDisableSaveButton(false);
          return;
        }
        localStorage.setItem("authToken", res.token);
        alert(res.message);
        setDisableSaveButton(false);
        setReceivedData({ ...receivedData, oldPassword: "", newPassword: "" });
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setDisableSaveButton(false);
      });
  }

  return (
    <div>
      {/* ERROR HANDLING */}
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

      {/* MAIN CODE PART */}
      <div className="navbar-container">
        <div className="brand-name">
          <img
            onClick={handleBrandLogoClick}
            src={brandLogo}
            alt="Bhilai Institute Of Technology"
            style={{ cursor: "pointer" }}
            width={80}
          />
          <div className="navigation-options">
            <button onClick={handleAdminButtonClick}>Admin</button>
            <button onClick={() => navigate("/report-complaint")}>
              Report Compaint
            </button>
            <button onClick={() => alert("button clicked")}>Tutorial</button>
          </div>
        </div>
        <div className="user-options">
          {data ? (
            <>
              <Button
                color="warning"
                onClick={() => {
                  alert("contact cliked");
                }}
              >
                Contact Us
              </Button>
              <Tooltip title="Open Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{data.name[0].toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={anchorElUser}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/admin/${data.department}/profile/${data.id}`);
                    setAnchorElUser(false);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenUpdateProfileBackdrop(true);
                    setAnchorElUser(false);
                    getData(data.id);
                  }}
                >
                  Update Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  color: "#F3E99F",
                  outline: "solid 1px #0B2447",
                  backgroundColor: "#19376D",
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* // Backdrop for profileUpdate */}

      {openUpdateProfileBackdrop && !receivedData ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openUpdateProfileBackdrop}
        >
          <div className="backdrop-element">
            <div className="backdrop-close-btn">
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => setOpenUpdateProfileBackdrop(false)}
              >
                <CloseIcon fontSize="large" />
              </Button>
            </div>
            <div className="backdrop-options-column">
              <TextField
                label="Name"
                onChange={handleChange}
                name="name"
                value={receivedData?.name}
                fullWidth
              />
              <TextField
                onChange={handleChange}
                value={receivedData?.email}
                label="Email"
                type="email"
                name="email"
                fullWidth
              />
              <TextField
                onChange={handleChange}
                select
                label="Select Department"
                defaultValue={receivedData?.department}
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
                onChange={handleChange}
                label="Phone Number"
                value={receivedData?.phoneNo}
                name="phoneNo"
              />
              <TextField
                onChange={handleChange}
                label="New Password"
                name="newPassword"
                type="password"
                value={receivedData?.newPassword || ""}
              />
              <TextField
                onChange={handleChange}
                label="Old Password"
                type="password"
                name="oldPassword"
                value={receivedData?.oldPassword || ""}
                required
              />
              <Button
                onClick={handleSaveChangesClick}
                variant="contained"
                color="success"
                size="large"
                disabled={disabelSaveButton}
              >
                SAVE CHANGES
              </Button>
            </div>
          </div>
        </Backdrop>
      )}
    </div>
  );
}
