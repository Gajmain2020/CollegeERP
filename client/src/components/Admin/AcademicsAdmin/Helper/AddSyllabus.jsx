import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import DoDisturbOnTwoToneIcon from "@mui/icons-material/DoDisturbOnTwoTone";
import { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { uploadSyllabus } from "../../../../services/department";

export default function AddSyllabus() {
  const department = ["", "CSE", "CIVIL", "EE", "EEE", "ETC", "IT", "MECH"];
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const [file, setFile] = useState(null);
  const [disableUpload, setDisableUpload] = useState(false);
  const [pdfData, setPdfData] = useState({
    department: "",
    semester: "",
  });

  useEffect(() => {
    document.title = "Upload Syllabus";
  }, []);

  //useEffect for handling year of exam for PYQ upload
  useEffect(() => {
    const temp = [];
    const currDate = String(new Date());
    for (let i = 0; i < 5; i++) {
      const yearOption = `${Number(currDate.split(" ")[3]) - 5 + i}-${
        Number(currDate.split(" ")[3].slice(1)) - 5 + 1 + i
      }`;
      temp.push(yearOption);
    }
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    // setDisableUpload(() => true);
  };
  function handleUpload() {
    if (pdfData.department === "" || pdfData.semester === "") {
      alert("Please Fill All The Details To Proceed Further.");
      setDisableUpload(false);
      return;
    }
    setDisableUpload(true);
    if (file === null) {
      alert("Please Upload A PDF File To Proceed Further.");
      setDisableUpload(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("department", pdfData.department);
    formData.append("semester", pdfData.semester);

    uploadSyllabus(formData)
      .then((res) => {
        setDisableUpload(false);
        if (res.successful === false) {
          alert(res.message);
          return;
        }
        alert(res.message);
        setFile(null);
        setPdfData(null);
        return;
      })
      .catch((err) => {
        alert(err.message);
        setDisableUpload(false);
        return;
      });
  }

  return (
    <>
      <div className="container">
        <div className="homepage">
          <div className="heading">Add Syllabus</div>
        </div>
        <div className="form-container">
          <div className="row">
            <TextField
              name="semester"
              select
              label="Semester"
              fullWidth
              helperText="Please select semester."
              onChange={(e) =>
                setPdfData((prev) => ({ ...prev, semester: e.target.value }))
              }
              value={pdfData?.semester}
            >
              {semester.map((sem, idx) => (
                <MenuItem value={sem} key={idx}>
                  {sem}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="department"
              select
              label="Department"
              fullWidth
              helperText="Please select department."
              onChange={(e) =>
                setPdfData((prev) => ({ ...prev, department: e.target.value }))
              }
              value={pdfData?.department}
            >
              {department.map((dept, idx) => (
                <MenuItem value={dept} key={idx}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="info">
            <InfoTwoToneIcon sx={{ filter: "invert(1)" }} />
            <span className="info-text">
              Note : PDF File name should be in the form of DEPARTMENT_SEMESTER.
              (Eg. CSE_IV)
            </span>
          </div>
          <div className="row">
            <Button
              fullWidth
              className="outline-effect"
              variant="outlined"
              component="label"
              disabled={file !== null}
            >
              {file === null
                ? `Upload File (PDF Format)`
                : `Selected File :: ${file.name}`}
              <input accept=".pdf" hidden type="file" onChange={onFileChange} />
            </Button>
            {file !== null && (
              <Button
                variant="outlined"
                onClick={() => {
                  setFile(null);
                }}
                className="outline-effect"
              >
                <DoDisturbOnTwoToneIcon />
              </Button>
            )}
          </div>
          <Button
            disabled={disableUpload}
            variant="contained"
            color="success"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div>
    </>
  );
}
