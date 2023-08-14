import axios from "axios";
import { m } from "framer-motion";

const URL = "http://localhost:3001/admin/exams/";

export async function publishNewExamForm(newExamData) {
  try {
    const resposen = await axios({
      url: URL + "new-exam-form-release",
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
      url: URL + `search-exam-form/?examData=${JSON.stringify(newExamData)}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function publishTimeTable(examSlots, exam) {
  try {
    const data = { examSlots, exam };
    const response = await axios({
      url: URL + "publish-exam-time-table",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

export async function publishNewBacklogExamForm(newExamData) {
  try {
    const resposen = await axios({
      url: URL + "new-exam-form-release",
      method: "POST",
      data: newExamData,
    });
    return resposen.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function uploadPdf(formData) {
  try {
    const res = await axios.post(
      "http://localhost:3001/admin/exams/upload-pyq-pdf",
      formData
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
