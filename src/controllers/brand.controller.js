const Joi = require("joi");
const Brand = require("../models/brand.model");
const sendResponse = require("../utils/sendResponse");
const Category = require("../models/category.model");

const brandSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required(),
  description: Joi.string()
    .trim()
    .allow("", null),
  categoryId: Joi.number()
    .integer()
    .required(),
});

// @desc    Create a brand
// @route   POST /api/brands
// @access  Admin
exports.createBrand = async (req, res) => {
  const { value, error } = brandSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message, null);
  }

  try {
    const existingBrand = await Brand.findOne({ where: { name: req.body.name } });
    if (existingBrand) {
      return sendResponse(res, 400, `Brand with name '${req.body.name}' already exists`, null);
    }
    const brand = await Brand.create(value);
    const newBrand = await Brand.findOne({ where: { id: brand.id }, include: Category });
    sendResponse(res, 201, "Brand created successfully", newBrand);
  } catch (error) {
    console.error("Error creating brand:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
exports.getAllBrands = async (req, res) => {
  try {
    const title = req.query.title;
    const categoryId = req.query.categoryId;
    const whereClause = {};
    if (title) {
      whereClause.title = { [Op.iLike]: `%${title}%` };
    }
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const brands = await Brand.findAll({ where: whereClause, include: Category });
    sendResponse(res, 200, "Brands retrieved successfully", brands);
  } catch (error) {
    console.error("Error retrieving brands:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get brand by ID
// @route   GET /api/brands/:id
// @access  Public
exports.getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return sendResponse(res, 404, "Brand not found", null);
    }
    sendResponse(res, 200, "Brand retrieved successfully", brand);
  } catch (error) {
    console.error("Error retrieving brand:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Admin
exports.updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    let brand = await Brand.findByPk(brandId);
    if (!brand) {
      return sendResponse(res, 404, "Brand not found", null);
    }
    brand = await brand.update(req.body);
    const newBrand = await Brand.findOne({ where: { id: brand.id }, include: Category });
    sendResponse(res, 200, "Brand updated successfully", brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Admin
exports.deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const deletedBrand = await Brand.destroy({ where: { id: brandId } });
    if (!deletedBrand) {
      return sendResponse(res, 404, "Brand not found", null);
    }
    sendResponse(res, 200, "Brand deleted successfully", null);
  } catch (error) {
    console.error("Error deleting brand:", error);
    sendResponse(res, 500, error.message, null);
  }
};
