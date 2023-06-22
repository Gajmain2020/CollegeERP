import React from "react";
import "./app.css";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import AdminLogin from "./components/Admin Login/AdminLogin";
import ReportComplaint from "./components/ReportComplaint/ReportComplaint";

//import for social logos
import linkedIn from "../src/Images/linkedin.png";
import github from "../src/Images/github.png";
import gmail from "../src/Images/gmail-logo.png";
import instagram from "../src/Images/instagram.png";
import AdminHomepage from "./components/Admin/AdminHomepage";
import DepartmentAdmin from "./components/Admin/DepartmentAdmin";
import Test from "./components/Test";
import StudentManagement from "./components/Admin/Student Management/StudentManagement";
import AdminSignUpHidden from "./components/Admin/AdminSignUpHidden";

export default function App() {
  return (
    <>
      <div className="background-only"></div>
      <Navbar />
      <Container className="main-container">
        <Routes>
          <Route path="/admin">
            <Route path="signUp" element={<AdminSignUpHidden />} />
            <Route path=":id" element={<AdminHomepage />} />
            <Route path="department">
              <Route path=":id" element={<DepartmentAdmin />} />
              <Route
                path=":id/student-management"
                element={<StudentManagement />}
              />
              <Route
                path=":id/faculty-management"
                element={<>Need to work bro</>}
              />
              <Route
                path=":id/time-table-management"
                element={<>Need to work bro</>}
              />
              <Route path=":id/complaints" element={<>Need to work bro</>} />
              <Route
                path=":id/notice-management"
                element={<>Need to work bro</>}
              />

              <Route
                path=":id/course-management"
                element={<>Need to work bro</>}
              />
            </Route>
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/report-complaint" element={<ReportComplaint />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
        {/* <div className="footer">
          <div className="footer-content">
            <div>
              All Rights Reserved To{" "}
              <a
                className="link"
                href="https://www.linkedin.com/in/gajendra-sahu-b24a51227/"
                target="_blank"
                rel="noreferrer"
              >
                Gajendra Sahu
              </a>
            </div>
            <div>
              Developed By{" "}
              <a
                className="link"
                href="https://www.linkedin.com/in/gajendra-sahu-b24a51227/"
                target="_blank"
                rel="noreferrer"
              >
                Gajendra Sahu
              </a>
            </div>
            <div className="social-link-logo">
              <a
                href="https://www.linkedin.com/in/gajendra-sahu-b24a51227/"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                <img width={25} alt="linkedin logo" src={linkedIn} />{" "}
              </a>
              <a
                href="mailto:gajmain2020@gmail.com"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                <img width={25} alt="gmail logo" src={gmail} />{" "}
              </a>
              <a
                href="https://github.com/Gajmain2020"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                <img width={25} alt="github logo" src={github} />{" "}
              </a>
              <a
                href="https://www.instagram.com/g_a_j.j_u/"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                <img width={25} alt="instagram logo" src={instagram} />{" "}
              </a>
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
}
