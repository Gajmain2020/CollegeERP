import { Button } from "@mui/material";
import React from "react";

export default function AddCourse() {
  return (
    <>
      <div className="homepage">
        <div className="heading">Add Course Module</div>
        <div className="button-container">
          <div className="button-row">
            <Button fullWidth>Add New Course</Button>
            <Button fullWidth>Add New Course</Button>
          </div>
        </div>
      </div>
    </>
  );
}
