const Joi = require("joi");

// Joi schema for product validation
exports.productSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required(),
  description: Joi.string()
    .trim()
    .allow("", null),
  price: Joi.number()
    .required()
    .min(0),
  discount: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .allow(null),
  quantity: Joi.number()
    .integer()
    .min(0)
    .default(0),
  image: Joi.allow("", null),
  categoryId: Joi.number().required(),
  brandId: Joi.number().required(),
});

// Joi schema for product update validation
exports.productUpdateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .allow("", null),
  description: Joi.string()
    .trim()
    .allow("", null),
  price: Joi.number()
    .min(0)
    .allow(null),
  discount: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .allow(null),
  quantity: Joi.number()
    .integer()
    .min(0)
    .allow(null),
  image: Joi.allow("", null),
  categoryId: Joi.number().allow(null),
  brandId: Joi.number().allow(null),
});

// Joi schema for user registration validation
exports.registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

// Joi schema for user login validation
exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

// Joi schema for cart validation
exports.cartItemSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

// Joi schema for cart item update validation
exports.cartItemUpdateSchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

exports.addressSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().required(),
  isDefault: Joi.boolean().default(false),
});

// Joi schema for address update validation
exports.addressUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  pincode: Joi.string(),
  isDefault: Joi.boolean(),
});

exports.orderSchema = Joi.object({
  addressId: Joi.number().required(),
});

exports.orderItemSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  orderId: Joi.number().required(),
});


exports.orderUpdateSchema = Joi.object({
  addressId: Joi.number(),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled"),
});


exports.profileUpdateSchema = Joi.object({
  name: Joi.string().allow("", null),
  gender: Joi.string().valid("male", "female", "other"),
  bio: Joi.string().allow("", null),
});


