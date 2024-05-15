const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Address = require("./address.model");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    /*   paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    }, */
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
        type: DataTypes.ENUM,
        values: ["pending", "processing", "shipped", "delivered", "cancelled"],
        allowNull: false,
    },
    /*  stripeId: {
      type: DataTypes.STRING,
      allowNull: false,
    }, */
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
  }
);

Order.belongsTo(Address, { onDelete: "no action" });
module.exports = Order;
