const express = require("express");

const userControllers = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", userControllers.login);

router.post("/register", userControllers.register);

router.get("/logout", userControllers.logout);

module.exports = router;
