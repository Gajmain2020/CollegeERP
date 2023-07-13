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

export default function ShowData() {
  document.title = "Verify Data";
  const encodedData = useLocation().pathname.split("/")[3];
  const decodedData = JSON.parse(decodeURIComponent(encodedData));
  console.log(decodedData);

  return (
    <div className="table">
      <div className="table-heading">Book Data </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <caption>
            * To change any data please change data in the CSV sheet and upload
            it again.
          </caption>
          <TableHead sx={{ bgcolor: yellow[300] }}>
            <TableRow>
              <TableCell>Book ID</TableCell>
              <TableCell align="right">Book Name</TableCell>
              <TableCell align="right">Book Author</TableCell>
              <TableCell align="right">No. Of Books</TableCell>
              <TableCell align="right">Price Of Single Book</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {decodedData.map((book) => (
              <TableRow
                key={book.bookId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book.bookId}
                </TableCell>
                <TableCell align="right">{book.bookName}</TableCell>
                <TableCell align="right">{book.bookAuthor}</TableCell>
                <TableCell align="right">{book.noOfBook}</TableCell>
                <TableCell align="right">{book.priceBook}</TableCell>
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
