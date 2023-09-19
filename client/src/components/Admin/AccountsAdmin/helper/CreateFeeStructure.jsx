import { Button, Container, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { uploadFeeStructure } from "../../../../services/accounts";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import DoDisturbOnTwoToneIcon from "@mui/icons-material/DoDisturbOnTwoTone";

export default function CreateFeeStructure() {
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const [yearOption, setYearOption] = useState([]);

  useEffect(() => {
    document.title = "Create Fee Structure";
  }, []);
  const [session, setSession] = useState("");
  const [file, setFile] = useState(null);
  const [disableUpload, setDisableUpload] = useState(false);

  useEffect(() => {
    const temp = [];
    const currDate = String(new Date());
    for (let i = 0; i < 5; i++) {
      const yearOption = `${Number(currDate.split(" ")[3]) + i} - ${
        Number(currDate.split(" ")[3].slice(1)) + 1 + i
      }`;
      temp.push(yearOption);
      setYearOption(() => [...temp]);
    }
  }, []);

  function handleUpload() {
    if (session === "") {
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
    formData.append("session", session);

    uploadFeeStructure(formData)
      .then((res) => {
        setDisableUpload(false);
        if (res.successful === false) {
          alert(res.message);
          return;
        }
        alert(res.message);
        setFile(null);
        setSession("");
        return;
      })
      .catch((err) => {
        alert(err.message);
        setDisableUpload(false);
        return;
      });
  }
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      <div className="homepage">
        <div className="heading">Release Fee Structure</div>
        <div className="container">
          <div className="form-container">
            <div className="row">
              <TextField
                name="sessionYear"
                select
                label="Select Session Year"
                helperText="Please select session year"
                fullWidth
                onChange={(e) => setSession(e.target.value)}
              >
                {yearOption.map((yr, idx) => (
                  <MenuItem value={yr} key={idx}>
                    {yr}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="info">
              <InfoTwoToneIcon sx={{ filter: "invert(1)" }} />
              <span className="info-text">
                Note : PDF File name should be in the form of
                DEPARTMENT_SEMESTER. (Eg. CSE_IV)
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
                <input
                  accept=".pdf"
                  hidden
                  type="file"
                  onChange={onFileChange}
                />
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
      </div>
    </Container>
  );
}
