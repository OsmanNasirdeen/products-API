const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(201).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: `user with email ${email} is not found in database`,
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return res
        .status(200)
        .json({ user, success: true, msg: "log in successful" });
    }
    res.status(401).json({ success: false, msg: "invalid password" });
  } catch (error) {
    res.status(500).json({ msg: error, success: false });
  }
};

const addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  encryptedUserPassword = await bcrypt.hash(password, 10);
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res
      .status(401)
      .json({
        success: false,
        msg: "User With This Email Already Exist. Please Login",
      });
  }
  try {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: encryptedUserPassword,
    });
    res.status(201).json({
      success: true,
      status: "user successfully added to database",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = { getAllUsers, getUser, addUser };
