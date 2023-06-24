import axios from "axios";

const URL = "http://localhost:5000/admin/library/";

export async function addSingleBook(bookData) {
  try {
    const response = await axios({
      url: URL + "add-single-book",
      method: "POST",
      data: bookData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
