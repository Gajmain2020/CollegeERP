import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { releaseFeeNotice } from "../../../../services/accounts";

export default function ReleaseFeeNotice() {
  const semester = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const session = ["2023-24", "2024-25", "2025-26"];

  const [noticeData, setNoticeData] = useState({
    noticeNumber: "",
    semester: "",
    session: "",
    noticeText: "",
    publish: true,
  });
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    document.title = "Release Fee Notice";
  }, []);

  function handleNoticeDataChange(e) {
    setNoticeData((noticeData) => ({
      ...noticeData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleReleaseFeeNotice() {
    setApiCalled(true);

    if (
      noticeData.noticeNumber === "" ||
      noticeData.semester === "" ||
      noticeData.session === "" ||
      noticeData.noticeText === ""
    ) {
      alert("Please Fill All The Fields To Proceed Further.");
      setApiCalled(false);
      return;
    }
    releaseFeeNotice(noticeData)
      .then((res) => {
        alert(res.message);
        if (!res.successful) {
          setApiCalled(false);
          return;
        }
        setNoticeData({
          noticeNumber: "",
          semester: "",
          session: "",
          noticeText: "",
          publish: true,
        });
        setApiCalled(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="homepage">
        <div className="heading">Release Exam Fee Notice</div>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="row">
            <TextField
              fullWidth
              label="Notice Number"
              name="noticeNumber"
              value={noticeData?.noticeNumber}
              onChange={handleNoticeDataChange}
            />
            <TextField
              name="semester"
              select
              label="Select Semester"
              helperText="Please select semester."
              fullWidth
              onChange={handleNoticeDataChange}
              value={noticeData?.semester}
            >
              {semester.map((sem, idx) => (
                <MenuItem value={sem} key={idx}>
                  {sem}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="row">
            <TextField
              name="session"
              select
              label="Select Session"
              helperText="Please select session."
              fullWidth
              onChange={handleNoticeDataChange}
              value={noticeData?.session}
            >
              {session.map((ses, idx) => (
                <MenuItem value={ses} key={idx}>
                  {ses}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              disabled
              label="Publish"
              value={"Publish Immediately"}
            />
          </div>
          <div className="row">
            <TextField
              multiline
              rows={5}
              name="noticeText"
              fullWidth
              label="Notice"
              onChange={handleNoticeDataChange}
              value={noticeData?.noticeText}
            />
          </div>
          <div className="row">
            <Button
              variant="outlined"
              sx={{ color: "#EBE76C" }}
              color="warning"
              fullWidth
              onClick={() => {
                setNoticeData(() => ({
                  noticeNumbers: "",
                  semester: "",
                  session: "",
                  noticeText: "",
                  publish: true,
                }));
              }}
            >
              Reset
            </Button>
            <Button
              onClick={handleReleaseFeeNotice}
              variant="contained"
              color="success"
              fullWidth
              disabled={apiCalled}
            >
              Release
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
