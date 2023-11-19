const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");
const HttpError = require("../models/error");

//LOGIN post /api/v1/login
exports.login = async (req, res, next) => {
  //get input from body
  const { email, password } = req.body;

  //find user on db
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login failed.Please try again!", 500));
  }

  //if there isn't any user with this email,send error msg
  if (!existingUser) {
    return next(new HttpError("Invalid email.", 401));
  }

  //compare the password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    new HttpError(
      "Could not log you in,please check your credentials and try again.",
      500
    );
  }

  //if there isn't a valid password, send an error msg
  if (!isValidPassword) {
    return next(new HttpError("Invalid password.", 401));
  }

  // create token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  //send response
  const { password: pass, ...user } = existingUser._doc;
  res.cookie("jwtToken", token).status(200).json({ user });
};

//RGISTER post /api/v1/register
exports.register = async (req, res, next) => {
  //get input from body
  const { name, email, password } = req.body;

  //check user if it is saved database before
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  //if there is existing user,send error msg
  if (existingUser) {
    return next(new HttpError("User exist already,please login.", 422));
  }

  // make a password crypted
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(12);
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  //create new user
  const newUser = new User({ name, email, password: hashedPassword });

  //save db
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  //send response
  res.status(201).json({ userId: newUser.id, email: newUser.email });
};

//LOGOUT get /api/v1/logout
exports.logout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};
