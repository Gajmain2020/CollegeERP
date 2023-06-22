import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Homepage() {
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSignupClick() {
    console.log("userType: " + userType);
  }

  function handleLoginClick() {
    console.log("userType: " + userType);
    console.log("data: ", data);
  }

  return (
    <div className="login-form">
      <div className="form-heading">Login</div>
      <div className="login-options">
        <div
          onClick={() => {
            setUserType("student");
            setData({ email: "", password: "" });
          }}
          className={`login-option ${userType === "student" ? "active" : ""}`}
        >
          Student
        </div>
        <div
          onClick={() => {
            setUserType("teacher");
            setData({ email: "", password: "" });
          }}
          className={`login-option ${userType === "teacher" ? "active" : ""}`}
        >
          Teacher
        </div>
      </div>
      <div className="form-container">
        <form>
          <TextField
            className="input-field"
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
          />
          <div className="password">
            <TextField
              onChange={handleChange}
              value={data.password}
              name="password"
              className="input-field"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
            />
            {showPassword ? (
              <VisibilityOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <div className="button-container">
            <Button
              variant="contained"
              color="success"
              size="large"
              fullWidth
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button fullWidth size="small" onClick={handleSignupClick}>
              Don't have an account?? Apply for one now !!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
