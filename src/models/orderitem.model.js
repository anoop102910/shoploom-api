// src/models/orderitem.model.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order.model");
const Product = require("./product.model");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
  }
);

OrderItem.belongsTo(Order, { onDelete: "cascade" });
OrderItem.belongsTo(Product, { onDelete: "cascade" });
// Order.hasMany(OrderItem);
// Product.hasMany(OrderItem);

module.exports = OrderItem;
