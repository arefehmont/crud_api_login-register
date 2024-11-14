import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./pages/login/index.jsx";
import BookList from "./pages/booklist/index.jsx";
import BookForm from "./pages/addBook/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import SingleBook from "./components/SingleBook.jsx"
import EditBook from "./pages/editBook/index.jsx";
import LayOut from "./components/layOut.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/auth/Register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/books/add",
        element: <BookForm />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/books/edit/:id",
        element: <EditBook />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
