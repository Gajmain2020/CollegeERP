import React from "react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../../Images/brand logo.png";
import Button from "@mui/material/Button";

export default function Navbar() {
  const navigate = useNavigate();

  function handleAdminButtonClick() {
    navigate("/admin-login");
  }

  function handleBrandLogoClick() {
    navigate("/");
  }

  function handleLoginClick() {
    alert("Login Button Clicked");
  }
  function handleSignupClick() {
    alert("SignUp Button Clicked");
  }

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}
