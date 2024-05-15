const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
} = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

// Admin routes
router.post("/", isAuth, isAdmin, createProduct);
router.put("/:id", isAuth, isAdmin, updateProduct);
router.delete("/:id", isAuth, isAdmin, deleteProduct);

module.exports = router;
