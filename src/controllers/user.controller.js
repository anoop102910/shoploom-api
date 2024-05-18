// controllers/user.controller.js

const Joi = require("joi");
const User = require("../models/user.model");
const sendResponse = require("../utils/sendResponse");
const uploadImage = require("../utils/uploadImage");

const profileUpdateSchema = Joi.object({
  gender: Joi.string().valid("male", "female", "other"),
  name: Joi.string()
    .trim()
    .allow("", null),
  role: Joi.string()
    .valid("Admin", "User")
    .allow("", null),
  bio: Joi.string()
    .trim()
    .allow("", null),
});

// @desc    Get list of all users
// @route   GET /api/users
// @access  SUPERADMIN
exports.getAllUsers = async (req, res) => {
  try {
    // Get all users
    const users = await User.findAll();
    sendResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get logged-in user
// @route   GET /api/users/me
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findByPk(userId, {
      attributes: ["name", "gender", "bio"],
    });
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }

    sendResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUser = async (req, res) => {
  // Validate request body
  const { value, error } = profileUpdateSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message, null);
  }

  try {
    const userId = req.params.id;

    let user = await User.findByPk(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }

    user = await user.update(value);

    sendResponse(res, 200, "User profile updated successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { value, error } = profileUpdateSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }

    newUser = await user.update(value);

    sendResponse(res, 200, "User profile updated successfully", newUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message, null);
  }
};


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }

    // Delete the user
    await user.destroy();

    sendResponse(res, 200, "User deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, error.message, null);
  }
};
