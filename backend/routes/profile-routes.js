const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");
const profileControllers = require("../controllers/profile-controller");

const router = express.Router();

router.get("/:id", profileControllers.getProfileById);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("birthYear").not().isEmpty(),
    check("country").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  profileControllers.postUserprofile
);

module.exports = router;
