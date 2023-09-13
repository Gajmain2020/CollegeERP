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

export default function ShowDataFaculties() {
  document.title = "Verify Data";
  const encodedData = useLocation().pathname.split("/")[3];
  const decodedData = JSON.parse(decodeURIComponent(encodedData));

  return (
    <div className="table">
      <div className="table-heading">Faqculties By Processed CSV File</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <caption>
            * To change any data please change data in the CSV sheet and upload
            it again.
          </caption>
          <TableHead sx={{ bgcolor: yellow[300] }}>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>EmpId</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {decodedData.map((faculty, idx) => (
              <TableRow
                className="table-hover-effect"
                key={faculty.empId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {faculty.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {faculty.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {faculty.empId}
                </TableCell>
                <TableCell>{faculty.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: "50px" }}
        onClick={() => window.close()}
      >
        Close
      </Button>
    </div>
  );
}
