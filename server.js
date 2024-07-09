const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const fileUpload = require("express-fileupload");

const { CLIENT_URL } = require("./src/config/config");
const sendResponse = require("./src/utils/sendResponse");

const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const brandRoute = require("./src/routes/brand.route");
const productRoute = require("./src/routes/product.route");
const categoryRoute = require("./src/routes/category.route");
const cartItemRoute = require("./src/routes/cartItem.route");
const wishlistItemRoute = require("./src/routes/wishlistItem.route");
const addressRoute = require("./src/routes/address.route");
const reviewRoute = require("./src/routes/review.route");
const orderRoute = require("./src/routes/order.route");

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

// app.use(delayMiddleware);//for testing
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/brands", brandRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cartitems", cartItemRoute);
app.use("/api/wishlistitems", wishlistItemRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);

app.use(compression());

app.get("/", (req, res) => {
  sendResponse(res, 200, "Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Listening on port ${PORT}`);
});

module.exports = app;
