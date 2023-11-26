const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
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
    existingUser = await User.findOne({ email: email }).populate("profile");
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
    return new HttpError(
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
      {
        userId: existingUser.id,
        email: existingUser.email,
        image: existingUser.profile[0].image,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
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
  //validator result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed,please check your data.", 422)
    );
  }
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
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    profile: [],
  });

  //save db
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  //send response
  res.status(201).json({ msg: "New user created!" });
};

//LOGOUT get /api/v1/logout
exports.logout = async (req, res, next) => {
  //remove cookie
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .json({ msg: "User logged out successfully!" });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};

//REFETCH USER get /api/v1/auth/refetch
exports.refetch = (req, res, next) => {
  const token = req.cookies;
  console.log(token);
  jwt.verify(
    token?.jwtToken,
    process.env.TOKEN_SECRET,
    {},
    async (err, data) => {
      if (err) {
        return next(new HttpError("Something went wrong", 500));
      }
      console.log(data);
      res.status(200).json(data);
    }
  );
};

//GET USER get /api/v1/auth/user/:id
exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.find({ _id: userId }).populate("profile");
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (!user) {
    return next(new HttpError("User not found!", 404));
  }

  const { password, ...info } = user[0]._doc;

  res.status(200).json(info);
};
