import axios from "axios";

const URL = "http://localhost:3001/admin/accounts/";

export async function releaseFeeNotice(noticeData) {
  try {
    const response = await axios({
      url: URL + "release-fee-notice",
      method: "POST",
      data: noticeData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function searchStudents(searchData) {
  try {
    const response = await axios({
      url:
        URL +
        `search-students-by-filter/?name=${searchData.name}&rollNumber=${searchData.rollNumber}&department=${searchData.department}&semester=${searchData.semester}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
