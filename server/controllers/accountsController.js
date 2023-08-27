import feePaymentNotice from "../models/feePaymentNotice.js";
import Students from "../models/student.js";

export const releaseFeeNotice = async (req, res) => {
  const noticeData = req.body;

  try {
    const feeNotice = await feePaymentNotice.findOne({
      noticeNumber: noticeData.noticeNumber,
    });
    if (feeNotice) {
      return res.status(403).json({
        message: `Notice from notice number: ${noticeData.noticeNumber} already exists in database.`,
        successful: false,
      });
    }
    feePaymentNotice.create({
      noticeNumber: noticeData.noticeNumber,
      semester: noticeData.semester,
      session: noticeData.session,
      noticeText: noticeData.noticeText,
      published: true,
    });
    return res.status(200).json({
      message: `Notice as notice number : '${noticeData.noticeNumber}' created and published successfully`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const searchByFilter = async (req, res) => {
  const searchData = req.query;
  let modifiedSearchData = {};

  if (searchData.name !== "") {
    modifiedSearchData.name = searchData.name;
  }
  if (searchData.rollNumber !== "") {
    modifiedSearchData.rollNumber = searchData.rollNumber;
  }
  if (searchData.semester !== "") {
    modifiedSearchData.semester = searchData.semester;
  }
  if (searchData.department !== "") {
    modifiedSearchData.department = searchData.department;
  }

  try {
    const students = await Students.findOne(modifiedSearchData);
    if (!students) {
      return res.status(404).json({
        message: `No Student Found.`,
        successful: false,
      });
    }
    return res.status(200).json({
      students,
      message: `Student Found.`,
      successful: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};
