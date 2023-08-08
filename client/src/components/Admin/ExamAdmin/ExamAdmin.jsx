import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExamAdmin({ id }) {
  const navigate = useNavigate();
  return (
    <div className="main-container homepage">
      <div className="heading">Welcome Exam Admin</div>
      <div className="button-container">
        <div className="button-row">
          <Button
            onClick={() => navigate(`/admin/Exam/exam-form/${id}`)}
            variant="contained"
            fullWidth
            size="small"
          >
            Release Exam Form
          </Button>
          <Button
            onClick={() => alert("work pending here")}
            variant="contained"
            fullWidth
            size="small"
          >
            Approve Exam Form
          </Button>
        </div>
        <div className="button-row">
          <Button
            onClick={() => navigate(`/admin/Exam/time-table/${id}`)}
            variant="contained"
            fullWidth
            size="small"
          >
            Release Exam Time Table
          </Button>
          <Button
            variant="contained"
            onClick={() => alert("work pending here")}
            fullWidth
            size="small"
          >
            Backlog Exam Form
          </Button>
        </div>
        <div className="button-row">
          <Button
            variant="contained"
            onClick={() => alert("work pending here")}
            fullWidth
            size="small"
          >
            Revaluation Request
          </Button>
          <Button
            onClick={() => alert("work pending here")}
            variant="contained"
            fullWidth
            size="small"
          >
            Exam Analysis
          </Button>
        </div>
        <div className="button-row">
          <Button
            variant="contained"
            onClick={() => alert("work pending here")}
            fullWidth
            size="small"
          >
            Upload PYQ's
          </Button>
          <Button
            onClick={() => alert("work pending here")}
            variant="contained"
            fullWidth
            size="small"
          >
            Complaint Resolution
          </Button>
        </div>
      </div>
    </div>
  );
}
