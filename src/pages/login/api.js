import axios from "axios";

export const login = async ({ username, password }) => {
  try {
    let response = await axios.post("http://localhost:3010/api/auth/login", {
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
      error: error.response.data.message,
    };
  }
};
