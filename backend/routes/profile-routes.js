const express = require("express");

const profileControllers = require("../controllers/profile-controller");

const router = express.Router();

router.post("/:id", profileControllers.postUserprofile);

module.exports = router;
