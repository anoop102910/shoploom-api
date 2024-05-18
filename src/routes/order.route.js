const express = require("express");
const { createOrder, getAllOrders, getOrderById } = require("../controllers/order.controller");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Private routes
router.post("/", isAuth, createOrder);
router.get("/", isAuth, getAllOrders);
router.get("/:id", isAuth, getOrderById);

module.exports = router;
