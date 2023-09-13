import Faculty from "../models/faculty.js";
import bcrypt from "bcryptjs";
export const addIndividualFaculty = async (req, res) => {
  try {
    const userData = req.body;
    const findFac = await Faculty.findOne({
      email: userData.email,
      empId: userData.empId,
    });
    if (findFac) {
      return res.status(409).json({
        message: `Faculty with email '${userData.email}' already exists. `,
        successful: false,
      });
    }

    const newPassword = await bcrypt.hash(userData.email, 10);

    await Faculty.create({
      name: userData.name,
      email: userData.email,
      password: newPassword,
      empId: userData.empId,
      department: userData.department,
    });

    return res.status(200).json({
      message: `Faculty with email '${userData.email}' created successfully.`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const addMultipleFaculties = async (req, res) => {
  try {
    const added = [];
    const rejected = [];
    const faculties = req.body;

    for (let i = 0; i < faculties.length; i++) {
      const { name, department, email, empId } = faculties[i];

      const facultyAlreadyAdded = await Faculty.findOne({ empId, email });
      if (facultyAlreadyAdded) {
        rejected.push(faculties[i]);
        continue;
      }
      const encryptedPassword = await bcrypt.hash(email, 10);

      await Faculty.create({
        name,
        password: encryptedPassword,
        email,
        department,
        empId,
      });

      added.push(faculties[i]);
    }
    return res.status(200).json({
      data: { added, rejected },
      message: `Faculties Added Successfully. Out of ${faculties.length} - ${added.length} are Added and ${rejected.length} are Rejected.`,
      successful: true,
    });
  } catch (error) {
    console.log("i am hrere");
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const fact = await Faculty.find();
    const faculties = [];

    for (let i = 0; i < fact.length; i++) {
      faculties.push({
        name: fact[i].name,
        email: fact[i].email,
        empId: fact[i].empId,
        department: fact[i].department,
      });
    }

    return res.status(200).json({
      faculties,
      message: `${faculties.length} data found.`,
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const updateSingleFaculty = async (req, res) => {
  try {
    const { faculty, modifiedFaculty } = req.body;

    const fact = await Faculty.findOne({
      empId: faculty.empId,
      email: faculty.email,
    });

    if (
      (await Faculty.findOne({
        empId: modifiedFaculty.empId,
      })) &&
      fact.empId !== modifiedFaculty.empId
    ) {
      return res.status(405).json({
        successful: false,
        message: `Faculty with employee id '${modifiedFaculty.empId}' or email '${modifiedFaculty.email}' already exists in DB.`,
      });
    }
    if (
      (await Faculty.findOne({
        email: modifiedFaculty.email,
      })) &&
      fact.email !== modifiedFaculty.email
    ) {
      return res.status(405).json({
        successful: false,
        message: `Faculty with employee id '${modifiedFaculty.empId}' or email '${modifiedFaculty.email}' already exists in DB.`,
      });
    }

    fact.name = modifiedFaculty.name;
    fact.email = modifiedFaculty.email;
    fact.rollNumber = modifiedFaculty.rollNumber;
    fact.semester = modifiedFaculty.semester;
    fact.department = modifiedFaculty.department;
    fact.updatedAt = new Date();

    const newPass = await bcrypt.hash(modifiedFaculty.email, 10);

    fact.password = newPass;

    fact.save();

    return res.status(200).json({
      successful: true,
      message: "Successfully updated faculty.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};

export const deleteMultipleFaculties = async (req, res) => {
  try {
    const faculties = req.body;

    for (let i = 0; i < faculties.length; i++) {
      await Faculty.findOneAndDelete({
        email: faculties[i].email,
        empId: faculties[i].empId,
      });
    }
    return res.status(200).json({
      message: `Successfully removed ${faculties.length} facult${
        faculties.length > 1 ? "ies" : "y"
      }.`,
      successful: "true",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
      successful: false,
    });
  }
};
export const deleteSingleFaculty = async (req, res) => {
  try {
    const faculty = req.body;
    await Faculty.findOneAndDelete({
      email: faculty.email,
      empId: faculty.empId,
    });
    return res.status(200).json({
      message: `Faculty with email '${faculty.email}' and employee id '${faculty.empId}' has been deleted successfully`,
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
