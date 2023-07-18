import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LibraryAdmin from "./LibraryAdmin";
import AnnouncementAdmin from "./Announcements/AnnouncementAdmin";

export default function DepartmentAdmin() {
  document.title = "Welcome Admin !!";

  const dept = useLocation().pathname.split("/")[2];
  const id = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

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

  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() =>
              navigate(`/admin/department/${id}/student-management`)
            }
            variant="contained"
            fullWidth
            size="small"
          >
            Student Management
          </Button>
          <Button
            onClick={() =>
              navigate(`/admin/department/${id}/faculty-management`)
            }
            variant="contained"
            fullWidth
            size="small"
          >
            Faculty Management
          </Button>
        </div>
        <div className="button-row">
          <Button
            onClick={() =>
              navigate(`/admin/department/${id}/time-table-management`)
            }
            variant="contained"
            fullWidth
            size="small"
          >
            Time Table Management
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/department/${id}/complaints`)}
            fullWidth
            size="small"
          >
            Complaints
          </Button>
        </div>
        <div className="button-row">
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/admin/department/${id}/notice-management`)
            }
            fullWidth
            size="small"
          >
            Add / Edit Notice
          </Button>
          <Button
            onClick={() =>
              navigate(`/admin/department/${id}/course-management`)
            }
            variant="contained"
            fullWidth
            size="small"
          >
            Course Management
          </Button>
        </div>
      </div>
    </div>
  );
}
