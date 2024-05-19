const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category.model");

class Brand extends Model {}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "brands",
  }
);

Brand.belongsTo(Category, { onDelete: "cascade" });
Category.hasMany(Brand, { constraints: false });

module.exports = Brand;
