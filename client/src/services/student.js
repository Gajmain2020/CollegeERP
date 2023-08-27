import axios from "axios";

export function sayHello() {
  alert("hello world!");
}

const URL = "http://localhost:3001/student/";

export async function addIndividualStudent(studentData) {
  try {
    const response = await axios({
      url: URL + "add-individual-student",
      method: "POST",
      data: studentData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addStudentsByCSV(students) {
  try {
    const response = await axios({
      url: URL + "add-multiple-students",
      method: "POST",
      data: students,
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

export async function getAllStudents() {
  try {
    const response = await axios({
      url: URL + `get-all-students`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateMultipleStudent(students, update) {
  try {
    const data = { students, update };
    const response = await axios({
      url: URL + `update-multiple-students`,
      method: "PATCH",
      data: data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteMultipleStudents(students) {
  try {
    const response = await axios({
      url: URL + `delete-multiple-students`,
      method: "DELETE",
      data: students,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateSingleStudent(student, modifiedStudent) {
  try {
    const data = { student, modifiedStudent };
    const response = await axios({
      url: URL + `update-single-student`,
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function deleteSingleStudent(student) {
  try {
    const response = await axios({
      url: URL + `delete-single-student`,
      method: "DELETE",
      data: student,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
