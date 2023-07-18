import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { yellow } from "@mui/material/colors";
import nothing from "../../Images/nothing.png";
import { motion as m } from "framer-motion";

export default function ShowDataIssueHistory() {
  document.title = "Check History";

  const encodedData = useLocation().pathname.split("/")[4];
  const decodedData = JSON.parse(decodeURIComponent(encodedData));

  return (
    <>
      <div className="table">
        <div className="table-heading">
          Student Issued {decodedData.bookName}
        </div>

        {decodedData.issuedTo.length === 0 ? (
          <div className="show-data-none">
            <div className="message">
              We regret to inform you that there is currently no data available
              in the table you are referring to.
              <br />
              <div className="image">
                <img src={nothing} alt="Nothing to show" />
              </div>
              It is possible that the absence of data in the table could be due
              to various reasons such as a recent update, technical
              difficulties, or the table being newly created without any,or no
              student have issued the book yet entries.
            </div>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ bgcolor: yellow[300] }}>
                <TableRow>
                  <TableCell a>S. No.</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Student Roll Number</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {decodedData.issuedTo.map((student, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.studentName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {student.studentRollNumber}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableBody>
                {decodedData.pastIssuedTo.length !== 0 &&
                  decodedData.pastIssuedTo.map((student, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{ color: "green" }}
                        component="th"
                        scope="row"
                      >
                        {idx + 1}
                      </TableCell>
                      <TableCell
                        sx={{ color: "green" }}
                        component="th"
                        scope="row"
                      >
                        {student.studentName}
                      </TableCell>
                      <TableCell
                        sx={{ color: "green" }}
                        component="th"
                        scope="row"
                      >
                        {student.studentRollNumber}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="contained"
          color="error"
          sx={{ mt: "50px" }}
          onClick={() => window.close()}
        >
          Close
        </Button>
      </div>
    </>
  );
}
