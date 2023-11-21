const Profile = require("../models/profile");
const HttpError = require("../models/error");

exports.postUserprofile = async (req, res, next) => {
  const { firstName, lastName, birthYear, country, address } = req.body;
  console.log(req.userData.userId);

  let profile;
  try {
    profile = await Profile.findOne({ creator: req.userData.userId });
  } catch (error) {
    return next(
      new HttpError("Creating profile failed,please try again.", 500)
    );
  }

  if (profile) {
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
