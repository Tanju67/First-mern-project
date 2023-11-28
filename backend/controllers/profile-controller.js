const { validationResult } = require("express-validator");
const Profile = require("../models/profile");
const HttpError = require("../models/error");
const User = require("../models/User");

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
    profile.image =
      "https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg";

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
      image:
        "https://www.masslive.com/resizer/kNl3qvErgJ3B0Cu-WSBWFYc1B8Q=/arc-anglerfish-arc2-prod-advancelocal/public/W5HI6Y4DINDTNP76R6CLA5IWRU.jpeg",
      creator: req.userData.userId,
    });

    try {
      await newProfile.save();
      await User.findOneAndUpdate(
        { _id: req.userData.userId },
        { profile: newProfile._id }
      );
    } catch (error) {
      new HttpError("Creating profile failed,please try again.", 500);
    }

    res.status(201).json({ message: "Profile created successfully." });
  }
};

//getProfileById GET api/v1/proofile/id
exports.getProfileById = async (req, res, next) => {
  //get user id from req.params
  const userId = req.params.id;

  //find profile for user id on db
  let userProfile = [];
  try {
    userProfile = await Profile.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Something went wrong.Try again.", 500));
  }

  //if there isn't any profile, send error msg
  if (userProfile.length === 0) {
    return res.status(200).json({ profile: userProfile });
  }

  //send response
  res.status(200).json({ profile: userProfile });
};
