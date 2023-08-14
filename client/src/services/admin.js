import axios from "axios";

const URL = "http://localhost:3001/admin/";

export async function signUpAdmin(adminData) {
  try {
    const response = await axios({
      url: URL + "sign-up",
      method: "POST",
      data: adminData,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function loginAdmin(data) {
  try {
    const response = await axios({
      url: URL + "login-admin",
      method: "POST",
      data,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAdminData(id) {
  try {
    const response = await axios({
      url: URL + `get-details/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
