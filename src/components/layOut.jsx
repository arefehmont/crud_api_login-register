import { useState, createContext } from "react";
import "./layOut.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const LayOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || "",
  });

  const privateRoutes = ["/books/add"];

  // Check user want to access a private route without being authenticated
  if (!authState.token && privateRoutes.includes(location.pathname)) {
    alert("You need to login to access this page");
    navigate("/auth/login");
  }

  return (
    <main>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/auth/register">Register</Link></li>
          <li><Link to="/auth/login">Login</Link></li>
          <li><Link to="/books">Books List</Link></li>
          <li><Link to="/books/add">Add/Create Book</Link></li>
          {/* If authenticated( private path), show the LogOut option */}
          {authState.token && (
            <li style={{background:"white",padding:"8px",borderRadius:"4px"}} onClick={() => {
              setAuthState({ token: "" });
              localStorage.removeItem("token");
            }}>
              LogOut
            </li>
          )}
        </ul>
      </nav>

      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Outlet />
      </AuthContext.Provider>
    </main>
  );
};

export default LayOut;