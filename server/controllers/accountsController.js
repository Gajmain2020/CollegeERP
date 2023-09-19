import feePaymentNotice from "../models/feePaymentNotice.js";
import Students from "../models/student.js";
import feePdf from "../models/feepdf.js";

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
    const students = await Students.find(modifiedSearchData);
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

export const sendRemainderToStudent = async (req, res) => {
  try {
    const student = await Students.findById(req.body._id);
    if (!student) {
      return res.status(404).json({
        message: `No student found.`,
        successful: false,
      });
    }
    student.notification = [
      ...student.notification,
      {
        noticeNumber: student.notification.length + 1,
        noticeSubject: `Fee payment remainder for ${student.semester} fee.`,
        seen: false,
        sentTime: new Date(),
      },
    ];
    console.log(student.notification);
    await student.save();
    return res.status(200).json({
      message: `Remainder sent to ${student.name}.`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const uploadFeeStructure = async (req, res) => {
  try {
    const file = await feePdf.findOne({
      fileName: req.file.originalname,
      filePath: req.file.path,
      session: req.body.session,
    });
    if (file) {
      return res
        .status(403)
        .json({ message: "File already exists", successful: false });
    }
    feePdf.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      session: req.body.session,
    });
    return res.status(200).json({
      message: "File uploaded successfully.",
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};
