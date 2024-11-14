import { useContext } from "react";
import { AuthContext } from "./components/layOut";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import "./app-style.css";

function App() {
  const { authState, setAuthState } = useContext(AuthContext);
  console.log(" ~ App ~ authState:", authState);

  const handleLogout = () => {
    setAuthState({ token: null });
    localStorage.removeItem("token");
  };

  // Sample book data
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "$10.99",
      description: "A novel about the American dream set in the 1920s.",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "$12.99",
      description: "A story of racial injustice in the Deep South.",
    },
    {
      title: "1984",
      author: "George Orwell",
      price: "$14.99",
      description: "A dystopian novel about totalitarianism and surveillance.",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "$11.99",
      description: "A romantic novel that critiques the British landed gentry.",
    },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <h1>Book Store</h1>
      </header>

      <main className="main-content">
        <section className="login-status">
          {authState.token ? (
            <>
              <p>Welcome back, {jwtDecode(authState.token).id}!</p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF0000",
                  color: "#FFFFFF",
                  '&:hover': { backgroundColor: "#CC0000" }
                }}
                onClick={handleLogout}
                style={{
                  width: "100px"}}
              >
                Logout
              </Button>
            </>
          ) : (
            <p>Please log in to continue.</p>
          )}
        </section>

        <section className="featured-section">
          <h2>Featured Books</h2>
          <p>Explore our collection of best-selling books.</p>
          <Grid container spacing={2}>
            {books.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {book.title}
                    </Typography>
                    <Typography color="text.secondary">
                      <strong>Author:</strong> {book.author}
                    </Typography>
                    <Typography color="text.secondary">
                      <strong>Price:</strong> {book.price}
                    </Typography>
                    <Typography variant="body2">
                      {book.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Book Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;