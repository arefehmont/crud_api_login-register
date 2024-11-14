import axios from "axios";

export const register = async ({ username, password }) => {
  try {
    const response = await axios.post("http://localhost:3010/api/auth/register", {
      username,
      password,
    });

    console.log(response);

    return {
      token: response.data.token,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.response?.data?.message || "An error occurred during registration.",
    };
  }
};