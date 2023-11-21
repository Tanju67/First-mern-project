const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", userControllers.login);

router.post(
  "/register",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail({ min: 5 }),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.register
);

router.get("/logout", userControllers.logout);

module.exports = router;
