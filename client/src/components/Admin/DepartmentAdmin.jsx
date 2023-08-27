import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LibraryAdmin from "./LibraryAdmin/LibraryAdmin";
import AnnouncementAdmin from "./Announcements/AnnouncementAdmin";
import ExamAdmin from "./ExamAdmin/ExamAdmin";
import Accounts from "./AccountsAdmin/Accounts";
import AcademicsAdmin from "./AcademicsAdmin/AcademicsAdmin";

export default function DepartmentAdmin() {
  document.title = "Welcome Admin !!";

  const dept = useLocation().pathname.split("/")[2];
  const id = useLocation().pathname.split("/")[3];

  if (dept === "Library") {
    return (
      <>
        <LibraryAdmin id={id} />
      </>
    );
  }
  if (dept === "Announcements") {
    return (
      <>
        <AnnouncementAdmin id={id} />
      </>
    );
  }
  if (dept === "Exam") {
    return (
      <>
        <ExamAdmin id={id} />
      </>
    );
  }
  if (dept === "Accounts") {
    return (
      <>
        <Accounts id={id} />
      </>
    );
  }
  if (dept === "Academics") {
    return (
      <>
        <AcademicsAdmin />
      </>
    );
  }

  return <>hellow world</>;
}
