const express = require("express");

const authControllers = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", authControllers.login);

router.post("/register", authControllers.login);

router.post("/logout", authControllers.login);

module.exports = router;
