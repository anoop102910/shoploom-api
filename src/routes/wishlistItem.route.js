const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistItem.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Private routes
router.post("/", isAuth, addToWishlist); // Add a product to the wishlist
router.delete("/:id", isAuth, removeFromWishlist); // Remove a product from the wishlist
router.get("/", isAuth, getWishlist); // Get user's wishlist

module.exports = router;
