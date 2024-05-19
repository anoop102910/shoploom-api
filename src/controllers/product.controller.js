const Joi = require("joi");
const Product = require("../models/product.model");
const sendResponse = require("../utils/sendResponse");
const { default: slugify } = require("slugify");
const { Op } = require("sequelize");
const { productSchema, productUpdateSchema } = require("../utils/joi.schema");
const { uploadImage } = require("../utils/uploadImage");
const Category = require("../models/category.model");
const Brand = require("../models/brand.model");

// @desc    Get all products
// @route   GET /api/products
// @access  User
exports.getAllProducts = async (req, res) => {
  try {
    const whereClause = {};
    const {
      title,
      categoryId,
      brandId,
      minrating,
      minprice,
      maxprice,
      mindiscount,
      minquantity,
      maxquantity,
      sortBy,
    } = req.query;

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if (title) {
      whereClause.title = { [Op.iLike]: `%${title}%` };
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    if (brandId) {
      whereClause.brandId = { [Op.in]: brands };
    }
    if (minrating) {
      whereClause.avgRating = { [Op.gte]: minrating };
    }
    if (mindiscount) {
      whereClause.discount = { [Op.gte]: mindiscount };
    }
    if (minprice && maxprice) {
      whereClause.price = { [Op.and]: { [Op.gte]: minprice, [Op.lte]: maxprice } };
    } else if (minprice) {
      whereClause.price = { [Op.gte]: minprice };
    } else if (maxprice) {
      whereClause.price = { [Op.lt]: maxprice };
    }
    if (minquantity && maxquantity) {
      whereClause.quantity = { [Op.and]: { [Op.gte]: minquantity, [Op.lte]: maxquantity } };
    } else if (minquantity) {
      whereClause.quantity = { [Op.gte]: minquantity };
    } else if (maxquantity) {
      whereClause.quantity = { [Op.lt]: maxquantity };
    }

    let orderBy;
    switch (sortBy) {
      case "pricelowtohigh":
        orderBy = [["price", "ASC"]];
        break;
      case "pricehightolow":
        orderBy = [["price", "DESC"]];
        break;
      case "rating":
        orderBy = [["avgRating", "DESC"]];
        break;
      case "newest":
        orderBy = [["createdAt", "DESC"]];
        break;
      case "discounthightolow":
        orderBy = [["discount", "DESC"]];
        break;
      case "discounthightolow":
        orderBy = [["discount", "ASC"]];
        break;
      default:
        orderBy = [["createdAt", "DESC"]];
    }

    const products = await Product.findAll({
      where: whereClause,
      order: orderBy,
      include: [Category, Brand],
      limit,
      offset: limit * (page - 1),
    });

    sendResponse(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    // Find the product by ID
    const product = await Product.findOne({ where: { slug }, include: [Category, Brand] });
    if (!product) {
      return sendResponse(res, 404, "Product not found", null);
    }

    sendResponse(res, 200, "Product retrieved successfully", product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { value, error } = productSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    const slug = slugify(value.title, { lower: true });
    const existingProduct = await Product.findOne({ where: { slug } });

    if (existingProduct) {
      return sendResponse(res, 400, `Product with same title already exists`, null);
    }
    if (!req.files || !req.files.image) {
      return sendResponse(res, 400, "Image is required", null);
    }
    const { url } = await uploadImage(req.files.image.data);
    value.image = url;

    const product = await Product.create(value);
    const newProduct = await Product.findByPk(product.id, { include: [Category, Brand] });
    console.log(newProduct);
    sendResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let product = await Product.findByPk(productId);
    if (!product) {
      return sendResponse(res, 404, "Product not found", null);
    }

    const { value, error } = productUpdateSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }
    if (req.files && req.files.image) {
      let { url } = await uploadImage(req.files.image.data);
      value.image = url;
    }

    // Update the product
    product = await product.update(value);
    sendResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    console.error("Error updating product:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.destroy({ where: { id: productId } });
    if (!deletedProduct) {
      return sendResponse(res, 404, "Product not found", null);
    }

    sendResponse(res, 200, "Product deleted successfully", null);
  } catch (error) {
    console.error("Error deleting product:", error);
    sendResponse(res, 500, error.message, null);
  }
};
