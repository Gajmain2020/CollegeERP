import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkForToken, decodeToken } from "../../../services/common";

export default function AcademicsAdmin() {
  const navigate = useNavigate();

  const [userDetailes, setUserDetails] = useState(null);

  useEffect(() => {
    checkForToken()
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.tokenExists === false) {
          navigate("/not-logged-in");
        }
        return decodeToken(res.token);
      })
      .then((res) => {
        setUserDetails(res);
      })
      .catch((err) => alert(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() =>
              navigate(
                `/admin/${userDetailes.department}/${userDetailes.id}/student-management`
              )
            }
            variant="contained"
            fullWidth
            size="small"
          >
            Student Management
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/admin/${userDetailes.department}/${userDetailes.id}/faculty-management`
              )
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
            variant="contained"
            onClick={() =>
              navigate(
                `/admin/${userDetailes.department}/${userDetailes.id}/complaints`
              )
            }
            fullWidth
            size="small"
          >
            Complaints
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/admin/${userDetailes.department}/${userDetailes.id}/course-management`
              )
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
