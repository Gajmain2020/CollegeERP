import axios from "axios";
import jwtDecode from "jwt-decode";

export async function updateUser(userType, data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/${userType}/update-user`,
      method: "PATCH",
      data,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function checkForToken() {
  const token = localStorage.getItem("authToken");
  if (token) {
    return {
      token: token,
      tokenExists: true,
    };
  }
  return false;
}

export async function decodeToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    return error.response.data;
  }
}
