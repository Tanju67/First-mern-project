const express = require("express");

const checkAuth = require("../middleware/check-auth");
const profileControllers = require("../controllers/profile-controller");

const router = express.Router();

router.use(checkAuth);

router.post("/", profileControllers.postUserprofile);

module.exports = router;
