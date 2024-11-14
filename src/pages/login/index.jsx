import { useContext } from "react";
import { useForm } from "react-hook-form";
import { login } from "./api";
import { AuthContext } from "../../components/layOut";
import "./style.css"; 

const LoginPage = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await login(data);
    if (response.token) {
      setAuthState((state) => ({ ...state, token: response.token }));
      localStorage.setItem("token", response.token);
    }
    console.log("🚀 ~ onSubmit ~ response:", response);
  };

  if (authState.token) {
    return <h1>You are already logged in</h1>;
  }

  return (
    <div className="form-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>
            Username:
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;