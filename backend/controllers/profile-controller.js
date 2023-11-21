const { validationResult } = require("express-validator");
const Profile = require("../models/profile");
const HttpError = require("../models/error");

exports.postUserprofile = async (req, res, next) => {
  //validator result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed,please check your data.", 422)
    );
  }

  //get inputs from req.body
  const { firstName, lastName, birthYear, country, address } = req.body;

  //check if there is profile on db
  let profile;
  try {
    profile = await Profile.findOne({ creator: req.userData.userId });
  } catch (error) {
    return next(
      new HttpError("Creating profile failed,please try again.", 500)
    );
  }

  if (profile) {
    //if there is profile on db,update
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.birthYear = birthYear;
    profile.country = country;
    profile.address = address;

    try {
      await profile.save();
    } catch (error) {
      new HttpError("Updating profile failed,please try again.", 500);
    }

    res.status(201).json({ message: "Profile updated successfully." });
  } else {
    //if there isn't profile on db,create
    const newProfile = new Profile({
      firstName,
      lastName,
      birthYear,
      country,
      address,
      creator: req.userData.userId,
    });

    try {
      await newProfile.save();
    } catch (error) {
      new HttpError("Creating profile failed,please try again.", 500);
    }

    res.status(201).json({ message: "Profile created successfully." });
  }
};
