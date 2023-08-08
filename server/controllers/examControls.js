import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import Exams from "../models/exams.js";

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
