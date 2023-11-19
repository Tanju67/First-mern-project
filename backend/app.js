const express = require("express");

const connectDB = require("./utils/db");

//routes-import
const authRoutes = require("./routes/auth-routes");
const placeRoutes = require("./routes/place-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

//routes-middleware
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/place", placeRoutes);

app.use("/api/v1/profile", userRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("app works on port 5000");
});
