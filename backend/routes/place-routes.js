const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/check-auth");

const fileUpload = require("../middleware/file-upload");

const placeControllers = require("../controllers/place-controller");

const router = express.Router();

router.get("/", placeControllers.getAllPlaces);

router.use(checkAuth);

router.get("/user/:id", placeControllers.getUserPlaces);

router.get("/:id", placeControllers.getPlaceById);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placeControllers.updatePlace
);

router.delete("/:id", placeControllers.deletePlace);

module.exports = router;
