import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/layOut";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const BookForm = () => {
  const { authState } = useContext(AuthContext);
  const [bookState, setBookState] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const createBook = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(
        "http://localhost:3010/api/books",
        bookState,
        {
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        }
      );
      console.log(response.data);
      setSnackbarMessage("Book added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Reset form after successful submit
      setBookState({
        title: "",
        author: "",
        isbn: "",
        publishedDate: "",
      });
    } catch (error) {
      console.error("Error creating book:", error);
      setSnackbarMessage("Failed to add book. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>
      <form onSubmit={createBook}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={bookState.title}
              onChange={(e) =>
                setBookState((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={bookState.author}
              onChange={(e) =>
                setBookState((prevState) => ({
                  ...prevState,
                  author: e.target.value,
                }))
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ISBN"
              variant="outlined"
              value={bookState.isbn}
              onChange={(e) =>
                setBookState((prevState) => ({
                  ...prevState,
                  isbn: e.target.value,
                }))
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Published Date"
              variant="outlined"
              type="date"
              value={bookState.publishedDate}
              onChange={(e) =>
                setBookState((prevState) => ({
                  ...prevState,
                  publishedDate: e.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: "#4CAF50", color: "#fff" }} 
               type="submit" fullWidth>
              Submit Book
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookForm;