import { TextField, Button, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { loginAdmin } from "../../services/admin";
import { useNavigate } from "react-router-dom";
import { checkForToken, decodeToken } from "../../services/common";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkForToken()
      .then((res) => {
        if (res.tokenExists === false) {
          return;
        }
        decodeToken(res.token).then((res) =>
          navigate(`/${res.userType}/${res.department}/${res.id}`)
        );
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  function handleChange(e) {
    setDisableLogin(false);
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleLoginClick() {
    setDisableLogin(true);
    if (data.email === "" || data.password === "") {
      setErrorMessage("All Fields Are Mandatory");
      setDisableLogin(false);
      return;
    }

    loginAdmin(data)
      .then((res) => {
        if (res.successful === false) {
          setErrorMessage(res.message);
          setDisableLogin(false);
          return;
        }
        localStorage.setItem("authToken", res.token);

        navigate(`/admin/${res.department}/${res.id}`);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setDisableLogin(false);
        return;
      });
  }
  return (
    <div className="login-form">
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
              disabled={disableLogin}
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
