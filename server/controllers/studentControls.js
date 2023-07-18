import Student from "../models/student.js";
import LibraryIssueStudent from "../models/libraryIssue.js";
import bcrypt from "bcryptjs";

export const addIndividualStudent = async (req, res) => {
  try {
    const { name, email, rollNo, semester, section } = req.body;

    const isStudentAlreadyExisting = await Student.findOne({ email });
    const isRollNoRegistered = await Student.findOne({ rollNo });

    if (isStudentAlreadyExisting || isRollNoRegistered) {
      return res
        .status(400)
        .json({ message: "Email or URN elready exists.", successful: false });
    }
    const password = await bcrypt.hash(email, 10);

    const result = await Student.create({
      name,
      email,
      password,
      rollNo,
      section,
      semester,
      department: "CSE",
    });
    return res
      .status(200)
      .json({ message: "Added Successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const searchStudent = async (req, res) => {
  try {
    const { studentName, studentRollNumber } = req.query;

    if (studentName === "undefined") {
      const response = await Student.findOne({ rollNo: studentRollNumber });

      if (!response) {
        return res.status(404).json({
          message: `Student not found with Roll Number ${studentRollNumber}.`,
          successful: false,
        });
      }
      return res.status(200).json({ data: response, successful: true });
    }

    const response = await Student.findOne({
      name: studentName,
      rollNo: studentRollNumber,
    });
    if (!response) {
      return res.status(404).json({
        message: `Student not found with name ${studentName} and roll number ${studentRollNumber}.`,
        successful: false,
      });
    }
    const sendData = {
      semester: response.semester,
      dept: response.department,
      email: response.email,
    };
    return res.status(200).json({ data: sendData, successful: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong", successful: false });
  }
};

export const fetchIssuedBooks = async (req, res) => {
  try {
    const { studentRollNumber } = req.query;
    const response = await LibraryIssueStudent.findOne({ studentRollNumber });
    if (!response) {
      return res.status(404).json({
        message: `Student not found with roll numner ${studentRollNumber}`,
        successful: false,
      });
    }
    return res.status(200).json({ data: response, successful: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong", successful: false });
  }
};
