const express = require("express");
const {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller.js");
const isAuth = require("../middlewares/isAuth.js");
const router = express.Router();

// Public routes
router.get("/", isAuth, getAllAddresses);
router.get("/:id", isAuth, getAddressById);

// Admin routes
router.post("/", isAuth, createAddress);
router.put("/:id", isAuth, updateAddress);
router.delete("/:id", isAuth, deleteAddress);

module.exports = router;
