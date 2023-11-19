const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./utils/db");

//routes-import
const userRoutes = require("./routes/user-routes");
const placeRoutes = require("./routes/place-routes");
const profileRoutes = require("./routes/profile-routes");

const app = express();
//it is necessary to parse json input
app.use(express.json());

//routes-middleware
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/place", placeRoutes);

app.use("/api/v1/profile", profileRoutes);

//false route middleware
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

//error middle ware
app.use((err, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {
  //     console.log(err);
  //   });
  // }
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occured!" });
});

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`app works on port:${process.env.PORT}`);
});
