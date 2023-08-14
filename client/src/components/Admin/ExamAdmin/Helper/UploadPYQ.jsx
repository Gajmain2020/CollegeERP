import { Button, MenuItem, TextField } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { useEffect, useState } from "react";
import { uploadPdf } from "../../../../services/exam";

export default function UploadPYQ() {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState(null);
  const [examSessionYearOption, setExamSessionYearOption] = useState([]);
  const [diableUpload, setDisableUpload] = useState(false);

  useEffect(() => {
    document.title = "Exam Form Release";

    const temp = [];
    const currDate = String(new Date());
    for (let i = 0; i < 5; i++) {
      const yearOption = `${Number(currDate.split(" ")[3]) - 5 + i} - ${
        Number(currDate.split(" ")[3].slice(1)) - 5 + 1 + i
      }`;
      temp.push(yearOption);
      setExamSessionYearOption(() => [...temp]);
    }
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setDisableUpload(() => true);
  };

  function handleUpload() {
    if (file === null) {
      alert("Please Upload A PDF File To Proceed Further.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    uploadPdf(formData)
      .then((res) => alert(res.message))
      .catch((err) => alert(err.message));
  }

  return (
    <div>
      <div className="homepage">
        <div className="heading">Upload PYQs</div>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="info">
            <InfoTwoToneIcon sx={{ filter: "invert(1)" }} />
            <span className="info-text">
              Note : PDF File name should be in the form of
              SUBJECTCODE_SUBJECTNAME_EXAMYEAR. (Eg. 100101CS_PPS_2018-19)
            </span>
          </div>
          <Button
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

          <Button variant="contained" color="success" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
