const express = require("express");

const userControllers = require("../controllers/user-controller");

const router = express.Router();

router.post("/:id", userControllers.postUserprofile);

module.exports = router;
