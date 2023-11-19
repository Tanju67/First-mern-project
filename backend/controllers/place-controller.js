const Place = require("../models/Place");
const User = require("../models/User");
const getCoordsForAddress = require("../utils/location");
const HttpError = require("../models/error");

exports.getAllPlaces = (req, res, next) => {};

exports.getUserPlaces = (req, res, next) => {};

exports.getPlaceById = (req, res, next) => {};

//CREATE PLACE post api/v1/place
exports.createPlace = async (req, res, next) => {
  //get inputs from req.body
  const { title, description, address, creator } = req.body;

  //tronsform address to geocode
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    next(error);
  }

  //create place based on place model
  const newPlace = new Place({
    title,
    description,
    image:
      "https://cdn.britannica.com/50/198450-050-3554B2AF/Ankara-Turkey.jpg",
    address,
    location: coordinates,
    creator,
  });

  //find user based on creator input
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Creating place failed,please try again.!", 500));
  }

  //id there isn't a user for creator id, return error msg
  if (!user) {
    return next(new HttpError("Could not find user", 404));
  }

  //save place on db
  try {
    await newPlace.save();
  } catch (error) {
    return next(
      new HttpError("Creating place failed,please try again.:)", 500)
    );
  }

  //send response
  res.status(201).json({ message: "Place created successfully!" });
};

exports.updatePlace = (req, res, next) => {};

exports.deletePlace = (req, res, next) => {};
