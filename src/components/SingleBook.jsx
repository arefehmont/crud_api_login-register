import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography, CircularProgress, Snackbar, TextField, Grid } from "@mui/material";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookState, setBookState] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/books/${id}`);
        if (response.data && response.data.success) {
          const fetchedBook = response.data.data;
          setBookState({
            ...fetchedBook,
            description: `This is more description for the book with ID: ${id}`,
          });
        } else {
          setError("Book not found.");
        }
      } catch (error) {
        console.error("Error fetching the book:", error);
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3010/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      navigate("/books");
    } catch (error) {
      console.error("Error deleting the book:", error.response ? error.response.data : error.message);
      setError("Failed to delete book.");
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ width: '50%' }}>
        <Typography variant="h4" gutterBottom>
          Book Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={bookState.title}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={bookState.author}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ISBN"
              variant="outlined"
              value={bookState.isbn}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Published Date"
              variant="outlined"
              type="date"
              value={bookState.publishedDate}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={bookState.description}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              Delete Book
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Book deleted successfully."
        />
      </div>
    </div>
  );
};

export default SingleBook;