import axios from "axios";

const URL = "http://localhost:5000/admin/announcements/";

const headers = {
  "Content-Type": "application/json",
  authorization: localStorage?.getItem("authToken")
    ? `Bearer ${localStorage?.getItem("authToken")}`
    : "",
};

export async function draftAnnouncement(draftData, userData) {
  const data = { userData, draftData };
  try {
    const response = await axios({
      headers: headers,
      url: URL + "draft-announcement",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function publishAnnouncement(announcementData, userData) {
  const data = { userData, announcementData };
  try {
    const response = await axios({
      headers: headers,
      url: URL + "publish-announcement",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchAllDraftedAnnouncements() {
  try {
    const response = await axios({
      url: URL + "fetch-all-drafted-announcements",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function publishEditedAnnouncement(publishData) {
  try {
    const response = await axios({
      url: URL + "publish-edited-announcement",
      method: "PATCH",
      data: publishData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function draftAnnouncementPublish(publishData) {
  try {
    const response = await axios({
      url: URL + "publish-draft-announcement",
      method: "PATCH",
      data: publishData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function fetchAllAnnouncements() {
  try {
    const response = await axios({
      url: URL + "fetch-all-announcements",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteSingleAnnouncement(announcement) {
  try {
    const response = await axios({
      url: URL + "delete-announcement",
      method: "DELETE",
      data: announcement,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
