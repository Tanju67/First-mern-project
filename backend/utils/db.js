const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tanju:abc123456@cluster0.ns9jslc.mongodb.net/mern?retryWrites=true&w=majority"
    );
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
