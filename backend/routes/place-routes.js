const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/check-auth");

const placeControllers = require("../controllers/place-controller");

const router = express.Router();

router.get("/", placeControllers.getAllPlaces);

router.use(checkAuth);

router.get("/user/:id", placeControllers.getUserPlaces);

router.get("/:id", placeControllers.getPlaceById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);

router.delete("/:id", placeControllers.deletePlace);

module.exports = router;
