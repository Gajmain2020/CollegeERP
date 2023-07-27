import announcements from "../models/announcements.js";

export const draftAnnouncement = async (req, res) => {
  try {
    const { draftData, userData } = req.body;

    //* find if same numbered Draft already exists or not.... if exists return error...else proceed
    const announcementNumberSame = await announcements.findOne({
      announcementNumber: draftData.announcementNumber,
    });

    if (announcementNumberSame) {
      return res.status(403).json({
        successful: false,
        message: `Announcement with Number ${draftData.announcementNumber} already exists in the database.`,
      });
    }

    announcements.create({
      announcementNumber: draftData.announcementNumber,
      announcementTitle: draftData.announcementTitle,
      announcementSubject: draftData.announcementSubject,
      announcementText: draftData.announcementText,
      announcementDepartment: draftData?.announcementDepartment || "All",
      announcementTitle: draftData.announcementTitle,
      published: false,
      creatorName: userData.name,
      creatorId: userData.id,
    });

    return res.status(201).json({
      message: "Announcement Drafted Successfully.",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: false });
  }
};

export const publishAnnouncement = async (req, res) => {
  try {
    const { announcementData, userData } = req.body;

    //* find if same numbered Draft or any announcement already published exists or not.... if exists return error...else proceed
    const announcementNumberSame = await announcements.findOne({
      announcementNumber: announcementData.announcementNumber,
    });

    if (announcementNumberSame) {
      return res.status(403).json({
        successful: false,
        message: `Announcement with Number ${announcementData.announcementNumber} already exists in the database.`,
      });
    }

    announcements.create({
      announcementNumber: announcementData.announcementNumber,
      announcementTitle: announcementData.announcementTitle,
      announcementSubject: announcementData.announcementSubject,
      announcementText: announcementData.announcementText,
      announcementDepartment: announcementData.announcementDepartment,
      announcementTitle: announcementData.announcementTitle,
      published: true,
      announcementPublishDate: new Date(),
      creatorName: userData.name,
      creatorId: userData.id,
    });

    return res.status(201).json({
      message: "Announcement Published Successfully.",
      successful: true,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: false });
  }
};

export const fetchDraftedAnnouncements = async (req, res) => {
  try {
    const draftedAnnouncements = await announcements.find({ published: false });
    return res.status(200).json({
      announcements: draftedAnnouncements,
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const publishEditedAnnouncement = async (req, res) => {
  try {
    const publishData = { ...req.body, published: true };

    const announcement = await announcements.findOne({
      announcementNumber: publishData.announcementNumber,
      publishData,
      upsert: true,
    });
    announcement.announcementNumber = publishData.announcementNumber;
    announcement.announcementTitle = publishData.announcementTitle;
    announcement.announcementSubject = publishData.announcementSubject;
    announcement.announcementDepartment =
      publishData?.announcementDepartment || "All";
    announcement.announcementText = publishData.announcementText;
    announcement.published = true;

    announcement.save();

    return res.status(200).json({
      message: "Announcement Updated And Published Successfully",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const publishDraftAnnouncement = async (req, res) => {
  try {
    const publishData = req.body;
    const announcement = await announcements.findById(publishData._id);

    announcement.published = true;

    announcement.save();

    return res.status(200).json({
      message: "Announcement Published Successfully",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: false });
  }
};

export const fetchAllAnnouncements = async (req, res) => {
  try {
    const allAnnouncements = await announcements.find();
    return res
      .status(200)
      .json({ announcements: allAnnouncements, successful: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const deleteAnnoucement = async (req, res) => {
  try {
    const announcementToBeDelete = req.body;
    await announcements.findOneAndRemove({ _id: announcementToBeDelete._id });

    return res.status(200).json({
      message: "Announcement deleted successfully",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
