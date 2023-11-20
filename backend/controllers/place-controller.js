const Place = require("../models/Place");
const User = require("../models/User");
const getCoordsForAddress = require("../utils/location");
const HttpError = require("../models/error");

//GET ALL PLACES get /api/v1/place
exports.getAllPlaces = async (req, res, next) => {
  // find all places on db
  let allPlaces = [];
  try {
    allPlaces = await Place.find({});
  } catch (error) {
    return next(new HttpError("Something went wrong.Try again.", 500));
  }

  //if there isn't any place, send error msg
  if (allPlaces.length === 0) {
    return next(new HttpError("Could not find  places", 404));
  }

  //send response
  res.status(200).json({ places: allPlaces });
};

//GET USER PLACES get /api/v1/place/user/:id
exports.getUserPlaces = async (req, res, next) => {
  //get user id from req.params
  const userId = req.params.id;

  //find places for user id on db
  let userPlaces = [];
  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Something went wrong.Try again.", 500));
  }

  //if there isn't any place, send error msg
  if (userPlaces.length === 0) {
    return next(new HttpError("Could not find  places", 404));
  }

  //send response
  res.status(200).json({ places: userPlaces });
};

//GET SINGLE PLACE get /api/v1/place/:id
exports.getPlaceById = async (req, res, next) => {
  //get place id from req.params
  const placeId = req.params.id;

  //find place for this id on db
  let place;
  try {
    place = await Place.findById({ _id: placeId });
  } catch (error) {
    return next(new HttpError("Something went wrong.Try again.", 500));
  }

  //if there isn't any place, send error msg
  if (!place) {
    return next(
      new HttpError("Could not find  place for the provided id.", 404)
    );
  }

  //send response
  res.status(200).json({ place: place });
};

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
