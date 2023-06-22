import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleLoginClick() {
    console.log("data: ", data);
  }
  return (
    <div className="login-form">
      <div className="form-heading">Login As Admin</div>
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

          {/* functionality to be added for login */}
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
          </div>
        </form>
      </div>
    </div>
  );
}
