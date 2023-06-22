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
