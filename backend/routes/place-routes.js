const express = require("express");
const checkAuth = require("../middleware/check-auth");

const placeControllers = require("../controllers/place-controller");

const router = express.Router();

router.get("/", placeControllers.getAllPlaces);

router.use(checkAuth);

router.get("/user/:id", placeControllers.getUserPlaces);

router.get("/:id", placeControllers.getPlaceById);

router.post("/", placeControllers.createPlace);

router.patch("/:id", placeControllers.updatePlace);

router.delete("/:id", placeControllers.deletePlace);

module.exports = router;
