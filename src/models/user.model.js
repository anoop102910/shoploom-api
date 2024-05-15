const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("User", "Admin"),
      allowNull: false,
      defaultValue: "User",
    },
  },
  {
    sequelize,
    modelName: "users",
    hooks: {
      beforeCreate: async (user) => {
        console.log('before', user)
        if (user.password) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      }
    }
  }
);

module.exports = User;
