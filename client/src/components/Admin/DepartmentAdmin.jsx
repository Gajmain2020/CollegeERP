import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function DepartmentAdmin() {
  document.title = "Welcome Admin !!";
  const id = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

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
