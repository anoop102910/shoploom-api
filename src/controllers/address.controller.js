const Joi = require("joi");
const Address = require("../models/address.model");
const sendResponse = require("../utils/sendResponse");
const { Op } = require("sequelize");
const { addressSchema, addressUpdateSchema } = require("../utils/joi.schema");

// @desc    Create an address
// @route   POST /api/addresses
// @access  Public
exports.createAddress = async (req, res) => {
  try {
    console.log("CREATE ADDRESS", req.body);
    // Validate request body
    const { value, error } = addressSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }
    value.userId = req.user.id;

    // Create the address
    const address = await Address.create(value);
    sendResponse(res, 201, "Address created successfully", address);
  } catch (error) {
    console.error("Error creating address:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update an address
// @route   PUT /api/addresses/:id
// @access  Public
exports.updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;

    // Find the address by ID
    let address = await Address.findByPk(addressId);
    if (!address) {
      return sendResponse(res, 404, "Address not found", null);
    }

    // Validate request body
    const { value, error } = addressUpdateSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    // Update the address
    address = await address.update(value);
    sendResponse(res, 200, "Address updated successfully", address);
  } catch (error) {
    console.error("Error updating address:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
// @access  Public
exports.deleteAddress = async (req, res) => {
  try {
    const addressId = parseInt(req.params.id);

    // Find the address by ID and delete it
    const deletedAddress = await Address.destroy({ where: { id: addressId } });
    if (!deletedAddress) {
      return sendResponse(res, 404, "Address not found", null);
    }

    sendResponse(res, 200, "Address deleted successfully", null);
  } catch (error) {
    console.error("Error deleting address:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get all addresses
// @route   GET /api/addresses
// @access  Public
exports.getAllAddresses = async (req, res) => {
  try {
    // Get all addresses
    console.log("GET ALL ADDRESSES");
    const userId = req.user.id
 
    // const addresses = await Address.findAll({ where: {userId} });
    const addresses = await Address.findAll();
    sendResponse(res, 200, "Addresses retrieved successfully", addresses);
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get address by ID
// @route   GET /api/addresses/:id
// @access  Public
exports.getAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;

    // Find the address by ID
    const address = await Address.findByPk(addressId);
    if (!address) {
      return sendResponse(res, 404, "Address not found", null);
    }

    sendResponse(res, 200, "Address retrieved successfully", address);
  } catch (error) {
    console.error("Error retrieving address:", error);
    sendResponse(res, 500, error.message, null);
  }
};
