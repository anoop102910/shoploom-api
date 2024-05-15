const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");
const User = require("../models/user.model");

const isAuth = async (req, res, next) => {
  req.user = {
    id: 2,
  };
  next();
  return;
  let token = req.headers["authorization"];
  console.log("token", token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: "Token not found" });

  token = token.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET_KEY, async (err, decode) => {
    if (err)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized", error: "Token has expired" });
    const { userId } = decode;

    const user = await User.findByPk(userId, { attributes: ["id", "name"] });
    req.user = user;

    if (!user) return res.status(404).json("User not found");

    next();
  });
};

module.exports = isAuth;
