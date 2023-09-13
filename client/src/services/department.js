import axios from "axios";

const URL = "http://localhost:3001/admin/course";

const headers = {
  "content-type": "application/json",
  authToken: window.localStorage.getItem("authToken") || null,
};

export async function addCourse(course) {
  try {
    const response = await axios({
      headers,
      url: URL + "/add-course",
      method: "POST",
      data: course,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllCourse() {
  try {
    const response = await axios({
      headers,
      url: URL + `/get-all-course`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteSingleCourse(course) {
  try {
    const response = await axios({
      headers,
      url: URL + "/delete-single-course",
      method: "DELETE",
      data: course,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function updateSingleCourse(course, modifiedCourse) {
  try {
    const response = await axios({
      headers,
      url: URL + "/update-single-course",
      method: "PATCH",
      data: { modifiedCourse, course },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function uploadSyllabus(formData) {
  try {
    const response = await axios.post(URL + "/upload-syllabus", formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
