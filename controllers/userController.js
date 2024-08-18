const userModel = require("../models/userModel");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user == null) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const validPassword = await brcypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword == null) {
      return res
        .status(400)
        .send({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;
    console.log(userId);
    res.status(200).send({
      message: "Login successful",
      success: true,
      token: token,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existinguser = await userModel.findOne({ email: req.body.email });
    if (existinguser != null) {
      return res
        .status(400)
        .send({ message: "User already exist", success: false });
    }
    const password = req.body.password;
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = await userModel(req.body);
    await newUser.save();
    return res.status(200).send({ message: "User saved", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
};
