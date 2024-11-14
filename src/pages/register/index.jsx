import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { register } from './api.js'; 
import { AuthContext } from '../../components/layOut'; 
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const RegisterPage = () => {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await register(data);
    if (response.token) {
      setAuthState({ token: response.token });
      localStorage.setItem("token", response.token); // save token in local storage
      navigate('/auth/login'); // Redirect to login page after successful registration
    } else {
      alert(`Registration failed: ${response.error}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...formRegister("username", { required: "Username is required" })}
          />
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formRegister("password", { required: "Password is required" })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;