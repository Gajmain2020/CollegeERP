import axios from "axios";

const URL = "http://localhost:5000/admin/exams/";

export async function publishNewExamForm(newExamData) {
  try {
    const resposen = await axios({
      url: URL + "/new-exam-form-release",
      method: "POST",
      data: newExamData,
    });
    return resposen.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function searchExamForm(newExamData) {
  try {
    const response = await axios({
      url: URL + `/search-exam-form/?examData=${JSON.stringify(newExamData)}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
