import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Table,
  TableContainer,
  Skeleton,
} from "@mui/material";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../../../services/library";

export default function ViewIssueHistoryComponent(props) {
  const { viewIssueHistory, setViewIssueHistory } = props;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((res) => setBooks(res.books))
      .catch((err) => console.log(err.message));
  }, []);

  function handleViewClick(book) {
    const encodedData = encodeURIComponent(JSON.stringify(book));
    const url = `http://localhost:3000/show-data/library/issue-history/${encodedData}`;
    window.open(url, "_blank", "width=800 height=600");
  }

  function renderRow(book, idx) {
    return (
      <>
        <TableRow>
          <TableCell>{idx + 1}</TableCell>
          <TableCell>{book.bookName}</TableCell>
          <TableCell>{book.bookId}</TableCell>
          <TableCell>{book.bookAuthor}</TableCell>
          <TableCell>{book.issuedTo.length}</TableCell>
          <TableCell>{book.availableNoOfBooks}</TableCell>
          <TableCell>
            <Button onClick={() => handleViewClick(book)} color="secondary">
              <RemoveRedEyeTwoToneIcon />
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  }

  function printSkeleton() {
    return (
      <>
        <TableRow>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={40} />
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <>
      {viewIssueHistory && (
        <>
          <div>
            <div className="modal-close-button">
              <Button
                onClick={() => {
                  setViewIssueHistory(false);
                }}
                variant="contained"
                color="error"
                size="small"
              >
                <CloseTwoToneIcon />
              </Button>
            </div>
            <div className="books">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead sx={{ backgroundColor: "#606C5D " }}>
                    <TableRow>
                      <TableCell>S. No.</TableCell>
                      <TableCell>Book Name</TableCell>
                      <TableCell>Book ID</TableCell>
                      <TableCell>Book Author</TableCell>
                      <TableCell>Current Issued</TableCell>
                      <TableCell>Available Books</TableCell>
                      <TableCell>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.length !== 0 ? (
                      books.map((book, idx) => renderRow(book, idx))
                    ) : (
                      <>{printSkeleton()}</>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}
