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
    modelName: "brand",

  }
);

Brand.belongsTo(Category, { onDelete: "cascade" ,onUpdate: "no action"});
Category.hasMany(Brand, { constraints: false });

module.exports = Brand;
