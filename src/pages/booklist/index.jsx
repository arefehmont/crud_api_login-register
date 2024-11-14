import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const BookList = () => {
  const [list, setList] = useState(null);

  const getBookList = async () => {
    try {
      let response = await axios.get("http://localhost:3010/api/books");
      const uniqueBooks = Array.from(
        new Map(response.data.data.map((book) => [book.title, book])).values()
      );
      setList(uniqueBooks);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <Grid container spacing={2}>
        {list ? (
          list.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Author:</strong> {book.author}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>ISBN:</strong> {book.isbn}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Published Date:</strong> {book.publishedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.description}
                  </Typography>
                  <h2>
                    <Link to={`/books/${book._id}`}>Read More</Link>
                  </h2>
                  {/* Edit Button */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to={`/books/edit/${book._id}`} // to the Edit Book page
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Grid>
    </div>
  );
};

export default BookList;