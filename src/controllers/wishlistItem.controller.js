const WishlistItem = require("../models/wishlistItem.model");
const Product = require("../models/product.model");
const sendResponse = require("../utils/sendResponse");

// @desc    Add a product to the wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return sendResponse(res, 404, "Product not found", null);
    }

    // Check if the product is already in the wishlist
    const existingItem = await WishlistItem.findOne({
      where: { userId, productId },
    });
    if (existingItem) {
      return sendResponse(res, 400, "Product already exists in the wishlist", null);
    }

    // Add the product to the wishlist
    const newItem = await WishlistItem.create({ userId, productId });
    sendResponse(res, 201, "Product added to the wishlist successfully", newItem);
  } catch (error) {
    console.error("Error adding product to the wishlist:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Remove a product from the wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlistItemId = parseInt(req.params.id);

    const item = await WishlistItem.findByPk(wishlistItemId);
    if (!item) {
      return sendResponse(res, 404, "Wishlist item not found", null);
    }

    // Remove the item from the wishlist
    await item.destroy();
    sendResponse(res, 200, "Product removed from the wishlist successfully", null);
  } catch (error) {
    console.error("Error removing product from the wishlist:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlistItems = await WishlistItem.findAll({
      where: { userId },
      include: Product,
    });
    sendResponse(res, 200, "Wishlist retrieved successfully", wishlistItems);
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    sendResponse(res, 500, error.message, null);
  }
};
