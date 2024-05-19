// src/controllers/order.controller.js
const sequelize = require("../config/database");
const CartItem = require("../models/cartItem.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderitem.model");
const Product = require("../models/product.model");
const sendResponse = require("../utils/sendResponse");
const { orderSchema, orderItemSchema, orderUpdateSchema } = require("../utils/joi.schema");
const Address = require("../models/address.model");
const { orderBy } = require("firebase/firestore");

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { value: orderValue, error } = orderSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    const cartItems = await CartItem.findAll({ where: { userId: req.user.id }, include: Product });
    if (cartItems.length === 0) {
      return sendResponse(res, 400, "Cart is empty", null);
    }
    const orderItemsValue = cartItems.map(cartItem => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
      price: Math.ceil(
        cartItem.product.price - (cartItem.product.price * cartItem.product.discount) / 100
      ),
    }));
    console.log(orderItemsValue);

    orderValue.amount = orderItemsValue.reduce(
      (total, orderItem) => total + orderItem.price * orderItem.quantity,
      0
    );
    orderValue.userId = req.user.id;
    orderValue.status = "pending";
    console.log(orderValue);
    const order = await sequelize.transaction(async t => {
      const newOrder = await Order.create(orderValue, { transaction: t });
      orderItemsValue.map(orderItem => (orderItem.orderId = newOrder.id));
      console.log(orderItemsValue);
      await OrderItem.bulkCreate(orderItemsValue, { validate: true, transaction: t });
      await CartItem.destroy({ where: { userId: req.user.id }, transaction: t });
      return newOrder;
    });

    sendResponse(res, 201, "Order created successfully", order);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error.message);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: [{ model: Address, paranoid: false }],
    });
    if (!order) {
      return sendResponse(res, 404, "Order not found", null);
    }
    const orderItems = await OrderItem.findAll({
      where: { orderId: order.id },
      include: Product,
    });
    const orderWithItems = {
      ...order.toJSON(),
      orderItems: orderItems.map(orderItem => orderItem.toJSON()),
    };
    sendResponse(res, 200, "Order retrieved successfully", orderWithItems);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error.message);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    sendResponse(res, 200, "Orders retrieved successfully", orders);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error.message);
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) {
      return sendResponse(res, 404, "Order not found", null);
    }
    order.status = "cancelled";
    await order.save();
    sendResponse(res, 200, "Order cancelled successfully", order);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error.message);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { value, error } = orderUpdateSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return sendResponse(res, 404, "Order not found", null);
    }

    await order.update(value);

    sendResponse(res, 200, "Order updated successfully", order);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, error.message);
  }
};
