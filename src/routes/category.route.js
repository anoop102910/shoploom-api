const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin routes
router.post("/", isAuth, isAdmin, createCategory);
router.put("/:id", isAuth, isAdmin, updateCategory);
router.delete("/:id", isAuth, isAdmin, deleteCategory);

module.exports = router;
