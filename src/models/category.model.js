const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Category extends Model {}

Category.init(
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
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "category",

  }
);

Category.belongsTo(Category, {
  foreignKey: "parentId",
  constraints: false,
  as: "parentCategory",
});

module.exports = Category;
