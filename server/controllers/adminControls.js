import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpAdmin = async (req, res) => {
  try {
    const { name, email, department, phoneNo } = req.body;

    const isStudentAlreadyExisting = await Admin.findOne({ email, department });
    if (isStudentAlreadyExisting) {
      return res.status(401).json({
        message: `Email In ${department}  Department Already Exists`,
        successful: false,
      });
    }

    const password = await bcrypt.hash(email, 10);

    const response = await Admin.create({
      name,
      email,
      password,
      phoneNo,
      department,
    });

    return res
      .status(200)
      .json({ message: "Admin Created Successfully", successful: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid Email Or Password", successful: false });
    }
    let validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
        successful: false,
      });
    }

    const token = jwt.sign(
      {
        userType: "admin",
        id: user._id,
        department: user.department,
        name: user.name,
      },
      `${user.department}`,
      { expiresIn: "1h" }
    );

    return res.cookie("token", token).status(200).json({
      token: token,
      message: "Login Successful",
      successful: true,
      department: user.department,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      successful: false,
    });
  }
};

export const getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userDetails = await Admin.findById(id);

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User not found", successful: false });
    }
    return res.status(200).json({
      id: userDetails._id,
      name: userDetails.name,
      department: userDetails.department,
      phoneNo: userDetails.phoneNo,
      email: userDetails.email,
    });
  } catch (error) {
    console.log("hello in error");
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const userDetails = await Admin.findById(req.body.id);

    console.log(userDetails);

    const isPassworMatch = await bcrypt.compare(
      req.body.oldPassword,
      userDetails.password
    );
    if (!isPassworMatch) {
      return res.status(400).json({
        message: "Invalid Password",
        successful: false,
      });
    }

    if (req.body.email !== "" && userDetails.email !== req.body.email) {
      userDetails.email = req.body.email;
      userDetails.updatedAt = new Date();
    }
    if (req.body.name !== "" && userDetails.name !== req.body.name) {
      userDetails.name = req.body.name;
      userDetails.updatedAt = new Date();
    }
    if (req.body.phoneNo !== "" && userDetails.phoneNo !== req.body.phoneNo) {
      userDetails.phoneNo = req.body.phoneNo;
      userDetails.updatedAt = new Date();
    }
    if (req.body.department !== userDetails.department) {
      userDetails.department = req.body.department;
      userDetails.updatedAt = new Date();
    }

    if (req.body.newPassword && req.body?.newPassword !== "") {
      userDetails.password = await bcrypt.hash(req.body.newPassword, 10);
      userDetails.updatedAt = new Date();
    }

    const token = jwt.sign(
      {
        userType: "admin",
        id: userDetails._id,
        department: userDetails.department,
        name: userDetails.name,
      },
      "signKey",
      { expiresIn: "1h" }
    );

    await userDetails.save();

    return res
      .status(200)
      .json({ token, message: "User Updated Successfully", successful: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", successful: false });
  }
};
