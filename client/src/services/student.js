import axios from "axios";

export function sayHello() {
  alert("hello world!");
}

const URL = "http://localhost:5000/student/";

export async function addIndividualStudent(studentData) {
  try {
    const response = await axios({
      url: URL + "addIndividualStudent",
      method: "POST",
      data: studentData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function searchStudent(studentData) {
  try {
    const response = await axios({
      url:
        URL +
        `search-student/?studentName=${
          studentData.studentName
        }&studentRollNumber=${studentData.studentRollNumber || null}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchIssuedBooks(studentRollNumber) {
  try {
    const response = await axios({
      url: URL + `fetch-books/?studentRollNumber=${studentRollNumber}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
