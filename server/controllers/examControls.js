import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import Exams from "../models/exams.js";
import multer from "multer";
import pyq from "../models/pyq.js";

export const newExamFormRelease = async (req, res) => {
  try {
    const examData = req.body;
    const admin = await Admin.findById(examData.userId);
    if (!admin) {
      return res.status(404).json({
        message: "User not found.",
        successful: false,
      });
    }
    const alreadyFormReleased = await Exams.findOne({
      examName: examData.examName,
      examSession: examData.examSession,
      examYear: examData.examYear,
      examSemester: examData.examSemester,
      examType: examData.examType,
    });
    if (alreadyFormReleased) {
      return res.status(409).json({
        message: "Exam form already released.",
        successful: false,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      examData.password,
      admin.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password Is Incorrect. Please Try Again.",
        successful: false,
      });
    }
    Exams.create({
      examName: examData.examName,
      examSession: examData.examSession,
      examYear: examData.examYear,
      examSemester: examData.examSemester,
      creatorId: examData.userId,
      creatorName: admin.name,
      examType: examData.examType,
    });

    return res.status(200).json({
      message: "Exam Form Released Successfully.",
      successful: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: "false" });
  }
};

export const searchExamForm = async (req, res) => {
  try {
    const stringData = req.query.examData;
    const examData = JSON.parse(stringData);

    //check user password....
    const userId = examData.userId;

    const admin = await Admin.findById(userId);

    const isPasswordCorrect = await bcrypt.compare(
      examData.password,
      admin.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Password Is Incorrect. Please Try Again.",
        successful: false,
      });
    }
    const examForm = await Exams.findOne({
      examName: examData.examName,
      examSemester: examData.examSemester,
      examSession: examData.examSession,
      examYear: examData.examYear,
      creatorId: examData.userId,
    });
    if (!examForm) {
      return res.status(404).json({
        message: "Given Data Exam Can Not Be Found.",
        successful: false,
      });
    }

    return res.status(200).json({ examForm, successful: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.", successful: "false" });
  }
};

export const publishExamTimeTable = async (req, res) => {
  try {
    const { examSlots, exam } = { ...req.body };

    const examDB = await Exams.findById(exam._id);

    examDB.examTimeTable = examSlots;
    examDB.save();

    return res.status(200).json({
      message: "Time Table For Exam Published Succefully.",
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please Try Again.",
      successful: false,
    });
  }
};

export const uploadPYQ = async (req, res) => {
  try {
    const pyqAvailable = await pyq.findOne({
      fileName: req.file.originalname,
      subjectCode: req.file.originalname.split("_")[0],
      examYear: req.file.originalname.split("_")[2].split(".")[0],
    });
    if (!pyqAvailable) {
      pyq.create({
        fileName: req.file.originalname,
        examYear: req.file.originalname.split("_")[2].split(".")[0],
        subjectCode: req.file.originalname.split("_")[0],
        filePath: req.file.path,
      });
      return res
        .status(200)
        .json({ message: "PDF uploaded successfully.", successful: true });
    }

    pyqAvailable.updatedAt = new Date();
    pyqAvailable.fileName = req.file.originalname;
    pyqAvailable.examYear = req.file.originalname.split("_")[2].split(".")[0];
    pyqAvailable.subjectCode = req.file.originalname.split("_")[0];
    pyqAvailable.filePath = req.file.path;
    pyqAvailable.save();
    return res
      .status(200)
      .json({ message: "PDF uploaded successfully.", successful: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please Try Again",
      successful: false,
    });
  }
};
