const bcrypt = require("bcrypt");

const User = require("../models/User");
const HttpError = require("../models/error");

//LOGIN post /api/v1/login
exports.login = (req, res, next) => {};

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
    hashedPassword = await bcrypt.hashSync(password, salt);
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

//LOGOUT
exports.logout = (req, res, next) => {};
