import { Button, MenuItem, TextField } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import DoDisturbOnTwoToneIcon from "@mui/icons-material/DoDisturbOnTwoTone";
import { useEffect, useState } from "react";
import { uploadPdf } from "../../../../services/exam";

export default function UploadPYQ() {
  //possible subject codes
  const possibleSubjectCodes = [
    "100101AM",
    "100102AP",
    "100103CS",
    "100104ME",
    "100105HM",
    "100201AM",
    "100202AC",
    "100203EE",
    "100205IT",
    "100206ME",
    "100206ME",
    "101301CE",
    "101302CE",
    "101303CE",
    "101304CE",
    "101305CE",
    "101301CS",
    "101302CS",
    "101303CS",
    "101304CS",
    "101305CS",
    "101301EE",
    "101302EE",
    "101303EE",
    "101304EE",
    "101305EE",
    "101301EEE",
    "101302EEE",
    "101303EEE",
    "101304EEE",
    "101305EEE",
    "101301ETC",
    "101302ETC",
    "101303ETC",
    "101304ETC",
    "101305ETC",
    "101301IT",
    "101302IT",
    "101303IT",
    "101304IT",
    "101305IT",
    "101301ME",
    "101302ME",
    "101303ME",
    "101304ME",
    "101305ME",
    "101401CE",
    "101402CE",
    "101403CE",
    "101404CE",
    "101405CE",
    "101401CS",
    "101402CS",
    "101403CS",
    "101404CS",
    "101405CS",
    "101401EE",
    "101402EE",
    "101403EE",
    "101404EE",
    "101405EE",
    "101401EEE",
    "101402EEE",
    "101403EEE",
    "101404EEE",
    "101405EEE",
    "101401ETC",
    "101402ETC",
    "101403ETC",
    "101404ETC",
    "101405ETC",
    "101401IT",
    "101402IT",
    "101403IT",
    "101404IT",
    "101405IT",
    "101401ME",
    "101402ME",
    "101403ME",
    "101404ME",
    "101405ME",
    "102501CE",
    "102502CE",
    "102503CE",
    "102504CE",
    "102505CE",
    "102501CS",
    "102502CS",
    "102503CS",
    "102504CS",
    "102505CS",
    "102501EE",
    "102502EE",
    "102503EE",
    "102504EE",
    "102505EE",
    "102501EEE",
    "102502EEE",
    "102503EEE",
    "102504EEE",
    "102505EEE",
    "102501ETC",
    "102502ETC",
    "102503ETC",
    "102504ETC",
    "102505ETC",
    "102501IT",
    "102502IT",
    "102503IT",
    "102504IT",
    "102505IT",
    "102501ME",
    "102502ME",
    "102503ME",
    "102504ME",
    "102505ME",
    "102601CE",
    "102602CE",
    "102603CE",
    "102604CE",
    "102605CE",
    "102601CS",
    "102602CS",
    "102603CS",
    "102604CS",
    "102605CS",
    "102601EE",
    "102602EE",
    "102603EE",
    "102604EE",
    "102605EE",
    "102601EEE",
    "102602EEE",
    "102603EEE",
    "102604EEE",
    "102605EEE",
    "102601ETC",
    "102602ETC",
    "102603ETC",
    "102604ETC",
    "102605ETC",
    "102601IT",
    "102602IT",
    "102603IT",
    "102604IT",
    "102605IT",
    "102601ME",
    "102602ME",
    "102603ME",
    "102604ME",
    "102605ME",
    "103701CE",
    "103801CE",
    "103702CE",
    "103802CE",
    "103703CE",
    "103803CE",
    "103704CE",
    "103804CE",
    "103705CE",
    "103805CE",
    "103701CS",
    "103801CS",
    "103702CS",
    "103802CS",
    "103703CS",
    "103803CS",
    "103704CS",
    "103804CS",
    "103705CS",
    "103805CS",
    "103701EE",
    "103801EE",
    "103702EE",
    "103802EE",
    "103703EE",
    "103803EE",
    "103704EE",
    "103804EE",
    "103705EE",
    "103805EE",
    "103701EEE",
    "103801EEE",
    "103702EEE",
    "103802EEE",
    "103703EEE",
    "103803EEE",
    "103704EEE",
    "103804EEE",
    "103705EEE",
    "103805EEE",
    "103701ETC",
    "103801ETC",
    "103702ETC",
    "103802ETC",
    "103703ETC",
    "103803ETC",
    "103704ETC",
    "103804ETC",
    "103705ETC",
    "103805ETC",
    "103701IT",
    "103801IT",
    "103702IT",
    "103802IT",
    "103703IT",
    "103803IT",
    "103704IT",
    "103804IT",
    "103705IT",
    "103805IT",
    "103701ME",
    "103801ME",
    "103702ME",
    "103802ME",
    "103703ME",
    "103803ME",
    "103704ME",
    "103804ME",
    "103705ME",
    "103805ME",
  ];

  const [file, setFile] = useState(null);
  const [possibleExamYear, setPossibleExamYear] = useState([]);
  const [disableUpload, setDisableUpload] = useState(false);

  useEffect(() => {
    document.title = "Upload PYQ's";
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
      setPossibleExamYear(() => [...temp]);
    }
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    // setDisableUpload(() => true);
  };

  function handleUpload() {
    setDisableUpload(true);
    if (file === null) {
      alert("Please Upload A PDF File To Proceed Further.");
      setDisableUpload(false);
      return;
    }

    if (
      !possibleSubjectCodes.includes(file.name.split("_")[0]) ||
      !possibleExamYear.includes(file.name.split("_")[2].split(".")[0])
    ) {
      alert("File name is not according to the given criteria.");
      setDisableUpload(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    uploadPdf(formData)
      .then((res) => {
        if (!res.successful) {
          setDisableUpload(false);
          alert("File Can Not Be Uploaded. Please try again.");
          return;
        }
        alert("File Uploaded Successfully.");
        setFile(null);
        setDisableUpload(false);
        return;
      })
      .catch((err) => {
        alert(err.message);
        setDisableUpload(false);
      });
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
    </div>
  );
}
