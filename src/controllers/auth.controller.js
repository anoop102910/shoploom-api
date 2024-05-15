// controllers/authController.js

const bcrypt = require("bcryptjs");
const Joi = require("joi");
const User = require("../models/user.model");
const { SERVER_URL } = require("../config/config");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");
const { registerSchema, loginSchema } = require("../utils/joi.schema");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  console.log(req.body);
  // Validate request body
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message);
  }

  try {
    let existingUser = await User.findOne({ where: { email: value.email } });

    if (existingUser) {
      return sendResponse(res, 400, "User already exists");
    }

    const user = await User.create(value);

    const token = jwt.sign({ name: user.name, id: user.id, email: user.email,role:user.role }, JWT_SECRET_KEY, {
      expiresIn: "240h",
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");

    sendResponse(res, 201, "User registered successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message);
  }

  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, 401, "Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ name: user.name, id: user.id, email: user.email,role:user.role }, JWT_SECRET_KEY, {
      expiresIn: "240h",
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Authorization", `Bearer ${token}`);

    sendResponse(res, 200, "User logged in successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error);
  }
};
