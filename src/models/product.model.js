const { DataTypes, Model } = require("sequelize");
const slugify = require("slugify");
const sequelize = require("../config/database");
const Category = require("./category.model");
const Brand = require("./brand.model");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    avgRating: {
      type: DataTypes.FLOAT,
      defaultValue: 3,
    },
    available:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull:false
    }
  },
  {
    sequelize,
    modelName: "products",
    paranoid:true
  }
);

Product.beforeCreate(product => {
  product.slug = slugify(product.title, { lower: true });
});

Product.belongsTo(Category, { onDelete: "cascade", onUpdate: "no action" });
Product.belongsTo(Brand, { onDelete: "cascade", onUpdate: "no action" });

Category.hasMany(Product, { constraints: false });
Brand.hasMany(Product, { constraints: false });

module.exports = Product;
