import { Alert, Button, MenuItem, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAdmin } from "../../services/admin";

export default function AdminSignUpHidden() {
  const navigate = useNavigate();
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

  const [disableSignUp, setDisableSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    department: "",
    phoneNo: "",
  });

  function handleChange(e) {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    setDisableSignUp(false);
  }

  function handleSignUpAdmin() {
    setDisableSignUp(true);
    if (
      adminData.name === "" ||
      adminData.email === "" ||
      adminData.phoneNo === "" ||
      adminData.department === ""
    ) {
      setErrorMessage("All Fields Are Required");
      setDisableSignUp(false);
      return;
    }

    signUpAdmin(adminData)
      .then((res) => {
        console.log(res);
        if (res.successful === false) {
          setErrorMessage(res.message);
          setDisableSignUp(false);
          return;
        }

        alert(res.message);
        navigate("/admin-login");
        setDisableSignUp(false);
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setDisableSignUp(false);
      });
  }

  return (
    <div>
      <div className="signup-container">
        <div className="signup-contents">
          <h2>SignUp As Admin</h2>
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
          <TextField
            value={adminData.name}
            onChange={handleChange}
            label="Name"
            name="name"
          />
          <TextField
            value={adminData.email}
            onChange={handleChange}
            label="Email"
            name="email"
          />
          <TextField
            value={adminData.phoneNo}
            onChange={handleChange}
            label="Phone Number"
            name="phoneNo"
            type="number"
          />

          <TextField
            onChange={handleChange}
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
          <Button
            variant="contained"
            onClick={handleSignUpAdmin}
            disabled={disableSignUp}
            color="success"
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
