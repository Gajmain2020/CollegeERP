import axios from "axios";

const URL = "http://localhost:3001/admin/faculty/";

export async function addIndividualFaculty(newFaculty) {
  try {
    const response = await axios({
      url: URL + "add-individual-faculty",
      method: "POST",
      data: newFaculty,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addFacultiesByCSV(faculties) {
  try {
    const response = await axios({
      url: URL + "add-multiple-faculties",
      method: "POST",
      data: faculties,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllFaculties() {
  try {
    const response = await axios({
      url: URL + "get-all-faculties",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateSingleFaculty(faculty, modifiedFaculty) {
  try {
    const data = { faculty, modifiedFaculty };
    const response = await axios({
      url: URL + "update-single-faculty",
      method: "PATCH",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function deleteSingleFaculty(faculty) {
  try {
    const response = await axios({
      url: URL + "delete-single-faculty",
      method: "DELETE",
      data: faculty,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function deleteMultipleFaculties(faculties) {
  try {
    const response = await axios({
      url: URL + "delete-multiple-faculties",
      method: "DELETE",
      data: faculties,
    });
    return response.data;
  } catch (error) {
    return error.respose.data;
  }
}
