const Joi = require("joi");
const Category = require("../models/category.model");
const sendResponse = require("../utils/sendResponse");
const { Op } = require("sequelize");
// Joi schema for category validation
const categorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .required(),
  description: Joi.string()
    .trim()
    .allow("", null),
  parentId: Joi.number().allow("", null),
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Admin
exports.createCategory = async (req, res) => {
  try {
    console.log("CREATE CATEGORY", req.body);
    // Validate request body
    const { value, error } = categorySchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    if (await Category.findOne({ where: { name: value.name } })) {
      return sendResponse(res, 400, `Category with name '${value.name}' already exists`, null);
    }

    // Create the category
    const category = await Category.create(value);
    const newCategory = await Category.findByPk(category.id, {
      include: [{ model: Category, as: "parentCategory" }],
    });
    sendResponse(res, 201, "Category created successfully", newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    let category = await Category.findByPk(categoryId);
    if (!category) {
      return sendResponse(res, 404, "Category not found", null);
    }

    // Validate request body
    const { value, error } = categorySchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, error.details[0].message, null);
    }

    // Update the category
    category = await category.update(value);
    const newCategory = await Category.findByPk(category.id, {
      include: [{ model: Category, as: "parentCategory" }],
    });

    sendResponse(res, 200, "Category updated successfully", newCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Admin
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    // Find the category by ID and delete it
    const deletedCategory = await Category.destroy({ where: { id: categoryId } });
    if (!deletedCategory) {
      return sendResponse(res, 404, "Category not found", null);
    }

    sendResponse(res, 200, "Category deleted successfully", null);
  } catch (error) {
    console.error("Error deleting category:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    // Get all categories
    console.log("GET ALL CATEGORIES");
    const name = req.query.name;
    const type = req.query.type;
    const whereClause = {};
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (type && type == "parent") {
      whereClause.parentId = null;
    }
    if (type && type === "sub") {
      whereClause.parentId = { [Op.not]: null };
    }
    if (req.query.parentId) {
      whereClause.parentId = parentId;
    }
    const categories = await Category.findAll({
      where: whereClause,
      include: [{ model: Category, as: "parentCategory" }],
      order: [["createdAt", "DESC"]],
    });
    sendResponse(res, 200, "Categories retrieved successfully", categories);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Category, as: "parentCategory" }],
    });
    if (!category) {
      return sendResponse(res, 404, "Category not found", null);
    }

    sendResponse(res, 200, "Category retrieved successfully", category);
  } catch (error) {
    console.error("Error retrieving category:", error);
    sendResponse(res, 500, error.message, null);
  }
};
