// routes/authRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");

const router = express.Router();

// Register a new user
router.post("/signup", registerUser);

// Login a user
router.post("/signin", loginUser);

module.exports = router;
