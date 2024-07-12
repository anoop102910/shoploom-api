const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product.model");
const User = require("./user.model");

class WishlistItem extends Model {}

WishlistItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "wishlist_item",
  }
);

WishlistItem.belongsTo(User, { onDelete: "cascade", onUpdate: "no action" });
WishlistItem.belongsTo(Product, { onDelete: "cascade", onUpdate: "no action" });
User.hasMany(WishlistItem);
Product.hasMany(WishlistItem);

module.exports = WishlistItem;
