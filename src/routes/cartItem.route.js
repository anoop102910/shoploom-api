const express = require("express");
const {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItem.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Private routes
router.post("/", isAuth, createCartItem);
router.get("/", isAuth, getAllCartItems);
router.get("/:id", isAuth, getCartItemById);
router.put("/:id", isAuth, updateCartItem);
router.delete("/:id", isAuth, deleteCartItem);

module.exports = router;
