import Student from "../models/student.js";
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
      department:'CSE'
    });
    return res
      .status(200)
      .json({ message: "Added Successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
