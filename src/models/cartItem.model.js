const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product.model");
const User = require("./user.model");

class CartItem extends Model {}

CartItem.init(
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
  },
  {
    sequelize,
  }
);

CartItem.belongsTo(User, { onDelete: "cascade" });
CartItem.belongsTo(Product, { onDelete: "cascade" });

module.exports = CartItem;
