import React from "react";
import "./app.css";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import AdminLogin from "./components/Admin Login/AdminLogin";
import ReportComplaint from "./components/ReportComplaint/ReportComplaint";

//import for social logos

import AdminHomepage from "./components/Admin/AdminHomepage";
import DepartmentAdmin from "./components/Admin/DepartmentAdmin";
import StudentManagement from "./components/Admin/AcademicsAdmin/Helper/StudentManagement";
import AdminSignUpHidden from "./components/Admin/AdminSignUpHidden";
import NotLoggedIn from "./components/NotLoggedIn/NotLoggedIn";
import ShowData from "./components/ShowData/ShowData";
import EditBooks from "./components/Admin/LibraryAdmin/EditBooks";
import IssueBook from "./components/Admin/LibraryAdmin/IssueBook";
import ShowDataIssueHistory from "./components/ShowData/ShowDataIssueHistory";
import ReturnBooks from "./components/Admin/LibraryAdmin/ReturnBooks";
import ReleaseExamForm from "./components/Admin/ExamAdmin/Helper/ReleaseExamForm";
import ReleaseTImeTable from "./components/Admin/ExamAdmin/Helper/ReleaseTImeTable";
import ReleaseBacklogForm from "./components/Admin/ExamAdmin/Helper/ReleaseBacklogForm";
import PageNotFound from "./components/PageNotFound";
import UploadPYQ from "./components/Admin/ExamAdmin/Helper/UploadPYQ";
import ReleaseFeeNotice from "./components/Admin/AccountsAdmin/helper/ReleaseFeeNotice";
import RemainderToStudent from "./components/Admin/AccountsAdmin/helper/RemainderToStudent";
import ShowDataStudents from "./components/ShowData/ShowDataStudents";
import EditDeleteStudents from "./components/Admin/AcademicsAdmin/Helper/EditDeleteStudents";
import TimeTableManagement from "./components/Admin/AcademicsAdmin/Helper/TimeTableManagement";
import FacultyManagement from "./components/Admin/AcademicsAdmin/Helper/FacultyManagement";
import ShowDataFaculties from "./components/ShowData/ShowDataFaculties";
import EditDeleteFaculties from "./components/Admin/AcademicsAdmin/Helper/EditDeleteFaculties";
import CourseManagement from "./components/Admin/AcademicsAdmin/Helper/CourseManagement";
import AddCourse from "./components/Admin/AcademicsAdmin/Helper/AddCourse";
import EditCourse from "./components/Admin/AcademicsAdmin/Helper/EditCourse";
import DeleteCourse from "./components/Admin/AcademicsAdmin/Helper/DeleteCourse";
import AddSyllabus from "./components/Admin/AcademicsAdmin/Helper/AddSyllabus";

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
            <Route path=":department">
              <Route path=":id" element={<DepartmentAdmin />} />
              <Route path="edit-books/:id" element={<EditBooks />} />
              <Route path="issue-books/:id" element={<IssueBook />} />
              <Route path="return-books/:id" element={<ReturnBooks />} />
              <Route path="exam-form/:id" element={<ReleaseExamForm />} />
              <Route path="time-table/:id" element={<ReleaseTImeTable />} />
              <Route path="upload-pyq/:id" element={<UploadPYQ />} />
              <Route
                path="release-fee-payment-notice/:id"
                element={<ReleaseFeeNotice />}
              />
              <Route
                path="send-fee-payment-remainder/:id"
                element={<RemainderToStudent />}
              />
              <Route
                path="release-backlog-form/:id"
                element={<ReleaseBacklogForm />}
              />

              <Route path=":id/student-management">
                <Route path="" element={<StudentManagement />} />
                <Route
                  path="edit-delete-students"
                  element={<EditDeleteStudents />}
                />
              </Route>
              <Route path=":id/faculty-management">
                <Route path="" element={<FacultyManagement />} />
                <Route
                  path="edit-delete-faculties"
                  element={<EditDeleteFaculties />}
                />
              </Route>

              <Route
                path=":id/time-table-management"
                element={<TimeTableManagement />}
              />
              <Route path=":id/complaints" element={<>Need to work bro</>} />
              <Route
                path=":id/notice-management"
                element={<>Need to work bro</>}
              />

              <Route path=":id/course-management">
                <Route path="" element={<CourseManagement />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="edit-course" element={<EditCourse />} />
                <Route path="delete-course" element={<DeleteCourse />} />
                <Route path="add-course-syllabus" element={<AddSyllabus />} />
              </Route>
            </Route>
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/report-complaint" element={<ReportComplaint />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/not-logged-in" element={<NotLoggedIn />} />
          <Route path="/show-data/library/:data" element={<ShowData />} />
          <Route
            path="/show-data/students/:data"
            element={<ShowDataStudents />}
          />
          <Route
            path="/show-data/faculty/:data"
            element={<ShowDataFaculties />}
          />
          <Route
            path="/show-data/library/issue-history/:data"
            element={<ShowDataIssueHistory />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  );
}
