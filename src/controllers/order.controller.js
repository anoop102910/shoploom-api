// src/controllers/order.controller.js
const sequelize = require("../config/database");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderitem.model");
const { sendResponse } = require("../utils");
const { orderSchema, orderItemSchema } = require("../utils/joi.schema");

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { value: orderValue, error } = orderSchema.validate(req.body);
    const orderItemsValue = req.body.orderItems;
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }
    orderValue.amount = order.reduce(
      (total, orderItem) => total + orderItem.price * orderItem.quantity,
      0
    );
    orderValue.status = "pending";
    const order = await sequelize.transaction(async t => {
      const order = await Order.create(orderValue, { transaction: t });
      await OrderItem.bulkCreate(orderItemsValue, { transaction: t });
      return order;
    });

    sendResponse(res, 201, "Order created successfully", order);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};
