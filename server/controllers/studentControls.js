import Student from "../models/student.js";
import LibraryIssueStudent from "../models/libraryIssue.js";
import bcrypt from "bcryptjs";

export const addIndividualStudent = async (req, res) => {
  try {
    console.log("hello", req.body);
    const { name, email, rollNumber, semester, section, department } = req.body;

    const isStudentAlreadyExisting = await Student.findOne({ email });
    const isRollNoRegistered = await Student.findOne({ rollNumber });

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
      rollNumber,
      section,
      semester,
      department,
    });
    return res
      .status(200)
      .json({ message: "Added Successfully", successful: true });
  } catch (error) {
    console.log(error.message);
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

export const addMultipleStudents = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const students = req.body;

    for (let i = 0; i < students.length; i++) {
      const { rollNumber, name, section, semester, department, email } =
        students[i];

      const bookAlreadyAdded = await Student.findOne({ rollNumber });
      if (bookAlreadyAdded) {
        rejected.push(students[i]);
        continue;
      }
      const encryptedPassword = await bcrypt.hash(email, 10);
      await Student.create({
        name,
        rollNumber,
        password: encryptedPassword,
        email,
        department,
        section,
        semester,
      });
      added.push(students[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: `Students Added Successfully. Out of ${students.length} - ${added.length} are Added and ${rejected.length} are Rejected.`,
      successful: true,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const sendData = students.map((student) => ({
      name: student.name,
      email: student.email,
      semester: student.semester,
      department: student.department,
      rollNumber: student.rollNumber,
    }));

    return res.status(200).json({
      message: "Students Data Successfully Sent.",
      students: sendData,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const updateMultipleStudents = async (req, res) => {
  try {
    const { update, students } = req.body;
    if (update.semester === "") {
      delete update.semester;
    }
    if (update.department === "") {
      delete update.department;
    }

    for (let i = 0; i < students.length; i++) {
      const stu = await Student.findOne({ email: students[i].email });

      stu.semester = update?.semester || stu.semester;
      stu.department = update?.department || stu.department;

      stu.save();
    }
    return res.status(200).json({
      message: `Successfully updated ${students.length} student${
        students.length > 1 && "s"
      }.`,
      successful: "true",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const deleteMultipleStudents = async (req, res) => {
  try {
    const students = req.body;

    for (let i = 0; i < students.length; i++) {
      await Student.findOneAndDelete({
        email: students[i].email,
        rollNumber: students[i].rollNumber,
      });
    }
    return res.status(200).json({
      message: `Successfully removed ${students.length} student${
        students.length > 1 && "s"
      }.`,
      successful: "true",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const updateSingleStudent = async (req, res) => {
  try {
    const { student, modifiedStudent } = req.body;

    const stu = await Student.findOne({
      rollNumber: student.rollNumber,
      email: student.email,
    });

    if (
      (await Student.findOne({
        rollNumber: modifiedStudent.rollNumber,
      })) &&
      stu.rollNumber !== modifiedStudent.rollNumber
    ) {
      return res.status(405).json({
        successful: false,
        message: `Student with roll number '${modifiedStudent.rollNumber}' or email '${modifiedStudent.email}' already exists in DB.`,
      });
    }
    if (
      (await Student.findOne({
        email: modifiedStudent.email,
      })) &&
      stu.email !== modifiedStudent.email
    ) {
      return res.status(405).json({
        successful: false,
        message: `Student with roll number '${modifiedStudent.rollNumber}' or email '${modifiedStudent.email}' already exists in DB.`,
      });
    }

    stu.name = modifiedStudent.name;
    stu.email = modifiedStudent.email;
    stu.rollNumber = modifiedStudent.rollNumber;
    stu.semester = modifiedStudent.semester;
    stu.department = modifiedStudent.department;
    stu.updatedAt = new Date();

    const newPass = await bcrypt.hash(modifiedStudent.email, 10);

    stu.password = newPass;

    stu.save();

    return res.status(200).json({
      successful: true,
      message: "Successfully updated student.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};
export const deleteSingleStudent = async (req, res) => {
  try {
    const student = req.body;

    await Student.findOneAndDelete({
      name: student.name,
      email: student.email,
    });

    return res.status(200).json({
      successful: true,
      message: "Successfully deleted student.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};
