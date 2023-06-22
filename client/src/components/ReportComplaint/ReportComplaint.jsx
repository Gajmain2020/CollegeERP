import { Button, MenuItem, TextField } from "@mui/material";
import complainIcon from "../../Images/complain.png";
import { useState } from "react";

export default function ReportComplaint() {
  const intialData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    userId: "",
    userType: "",
    message: "",
  };
  const [data, setData] = useState(intialData);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("this is data ", data);
  }

  function handleSubmit() {
    console.log("submitable Data is", data);
  }

  return (
    <div>
      <div className="complaint-container">
        <div className="display-message">
          <img width={80} src={complainIcon} alt="" />
          We apologize for any inconvenience caused. Please provide us with
          details of your complaint so that we can address it promptly.
          <br /> Thank you !
        </div>
        <div className="complaint-field">
          <div className="complaint-input-row">
            <TextField
              fullWidth
              label="Full-Name"
              name="fullName"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div className="complaint-input-row">
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="User-ID"
              name="userId"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              select
              label="User Type"
              defaultValue="Student"
              helperText="Please select your user type"
              onChange={handleChange}
              name="userType"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </div>

          <TextField
            label="Message"
            variant="outlined"
            multiline
            name="message"
            fullWidth
            rows={3}
            onChange={handleChange}
          />
          <Button variant="contained" color="warning" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}
