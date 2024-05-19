const Joi = require("joi");
const CartItem = require("../models/cartItem.model");
const sendResponse = require("../utils/sendResponse");
const { Op } = require("sequelize");
const { cartItemSchema, cartItemUpdateSchema } = require("../utils/joi.schema");
const Product = require("../models/product.model");

// @desc    Create a cartItem
// @route   POST /api/cartItems
// @access  Private
exports.createCartItem = async (req, res) => {
  console.log("CREATE CARTITEM");
  const { value, error } = cartItemSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message, null);
  }

  value.userId = req.user.id;

  const product = await Product.findOne({ where: { id: value.productId } });
  if (!product) {
    return sendResponse(res, 404, "Product not found", null);
  }

  const existingCartItem = await CartItem.findOne({
    where: { userId: value.userId, productId: value.productId },
  });

  if (existingCartItem) return sendResponse(res, 400, "Product already exist");

  if (product.quantity < value.quantity) {
    return sendResponse(res, 400, "Insufficient quantity", null);
  }

  try {
    const cartItem = await CartItem.create(value);
    sendResponse(res, 201, "CartItem created successfully", cartItem);
  } catch (error) {
    console.error("Error creating cartItem:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get all cartItems
// @route   GET /api/cartItems
// @access  Private
exports.getAllCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: Product,
      order: [["createdAt", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    sendResponse(res, 200, "CartItems retrieved successfully", cartItems);
  } catch (error) {
    console.error("Error retrieving cartItems:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get cartItem by ID
// @route   GET /api/cartItems/:id
// @access  Private
exports.getCartItemById = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return sendResponse(res, 404, "CartItem not found", null);
    }
    if (cartItem.userId !== req.user.id) {
      return sendResponse(res, 403, "Unauthorized", null);
    }
    sendResponse(res, 200, "CartItem retrieved successfully", cartItem);
  } catch (error) {
    console.error("Error retrieving cartItem:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update a cartItem
// @route   PUT /api/cartItems/:id
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    const { error } = cartItemUpdateSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }
    let cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return sendResponse(res, 404, "CartItem not found", null);
    }

    cartItem = await CartItem.update(
      { quantity },
      { where: { id: cartItemId } },
      { returning: true }
    );

    sendResponse(res, 200, "CartItem updated successfully", cartItem);
  } catch (error) {
    console.error("Error updating cartItem:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete a cartItem
// @route   DELETE /api/cartItems/:id
// @access  Private
exports.deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedCartItem = await CartItem.destroy({ where: { id: cartItemId } });
    if (!deletedCartItem) {
      return sendResponse(res, 404, "CartItem not found", null);
    }
    sendResponse(res, 200, "CartItem deleted successfully", null);
  } catch (error) {
    console.error("Error deleting cartItem:", error);
    sendResponse(res, 500, error.message, null);
  }
};
