const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");

const generateToken = (data, time = "24h") => {
  console.log('generateToken',data, time);
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: time,
  });
};

module.exports = generateToken;
