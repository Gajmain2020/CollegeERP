import axios from "axios";

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
