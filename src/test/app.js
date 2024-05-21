const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const fileUpload = require("express-fileupload");

const { CLIENT_URL } = require("../config/config");
const sendResponse = require("../utils/sendResponse");

const authRoute = require("../routes/auth.route");
const userRoute = require("../routes/user.route");
const brandRoute = require("../routes/brand.route");
const productRoute = require("../routes/product.route");
const categoryRoute = require("../routes/category.route");
const cartItemRoute = require("../routes/cartItem.route");
const wishlistItemRoute = require("../routes/wishlistItem.route");
const addressRoute = require("../routes/address.route");
const reviewRoute = require("../routes/review.route");
const orderRoute = require("../routes/order.route");


const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: "10*1024*1024" } }));
app.use(helmet());
const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brands", brandRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use('/api/cartitems',cartItemRoute);
app.use('/api/wishlistitems',wishlistItemRoute);
app.use('/api/addresses',addressRoute);
app.use('/api/reviews',reviewRoute);
app.use('/api/orders',orderRoute);

app.use(compression());

app.get("/", (req, res) => {
  sendResponse(res, 200, "Server is running");
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});


module.exports = app;