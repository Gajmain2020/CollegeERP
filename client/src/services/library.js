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

export async function addMultipleBooks(books) {
  try {
    const response = await axios({
      url: URL + "add-multiple-books",
      method: "POST",
      data: books,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchBooks() {
  try {
    const response = await axios({
      url: URL + "fetch-books",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteBook(bookId) {
  try {
    const response = await axios({
      url: URL + `delete-book/?bookId=${bookId}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function bookUpdate(book) {
  try {
    const response = await axios({
      url: URL + `edit-book/?bookId=${book._id}`,
      method: "PATCH",
      data: book,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
