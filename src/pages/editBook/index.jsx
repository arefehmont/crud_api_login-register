import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Snackbar, CircularProgress } from "@mui/material";

const EditBook = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/books/${id}`);
        if (response.data && response.data.success) {
          const fetchedBook = response.data.data;
          setBook({
            title: fetchedBook.title || "",
            author: fetchedBook.author || "",
            isbn: fetchedBook.isbn || "",
            publishedDate: fetchedBook.publicationYear || "",
            description: fetchedBook.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching the book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3010/api/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      navigate("/books");
    } catch (error) {
      console.error("Error updating the book:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ width: '50%' }}>
        <Typography variant="h4" gutterBottom>
          Edit Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Published Date"
            name="publishedDate"
            type="date"
            value={book.publishedDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={book.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Book
          </Button>
        </form>
        {success && (
          <Snackbar
            open={success}
            message="Book updated successfully!"
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          />
        )}
      </div>
    </div>
  );
};

export default EditBook;