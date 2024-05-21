const Joi = require("joi");
const Review = require("../models/review.model");
const sendResponse = require("../utils/sendResponse");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const reviewSchema = Joi.object({
  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  comment: Joi.string()
    .trim()
    .allow("", null),
  productId: Joi.number()
    .integer()
    .required(),
});

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  const { value, error } = reviewSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.details[0].message, null);
  }
  try {
    value.userId = req.user.id;
    const product = await Product.findOne({ where: { id: value.productId } });
    if (!product) {
      return sendResponse(res, 400, "Product not found", null);
    }
    const review = await Review.sequelize.transaction(async t => {
      const review = await Review.create(value, { transaction: t });
      const reviewCount = await Review.count({ where: { productId: value.productId }, transaction: t });
      const totalRating = product.avgRating * (reviewCount - 1) + value.rating;
      console.log("rating", totalRating);
      const newAvgRating = totalRating / reviewCount;
      await product.update({ avgRating: newAvgRating }, { transaction: t });
      return review;
    });

    sendResponse(res, 201, "Review created successfully", review);
  } catch (error) {
    console.error("Error creating review:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [["createdAt", "DESC"]] });
    sendResponse(res, 200, "Reviews retrieved successfully", reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    sendResponse(res, 500, error.message, null);
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.findAll({
      where: { productId },
      include: { model: User, attributes: ["name", "id"] },
      order: [["createdAt", "DESC"]],
    });
    sendResponse(res, 200, "Reviews retrieved successfully", reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Get review by ID
// @route   GET /api/reviews/:id
// @access  Public
exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return sendResponse(res, 404, "Review not found", null);
    }
    sendResponse(res, 200, "Review retrieved successfully", review);
  } catch (error) {
    console.error("Error retrieving review:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    let review = await Review.findByPk(reviewId);
    if (!review) {
      return sendResponse(res, 404, "Review not found", null);
    }
    review = await review.update(req.body);
    sendResponse(res, 200, "Review updated successfully", review);
  } catch (error) {
    console.error("Error updating review:", error);
    sendResponse(res, 500, error.message, null);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.destroy({ where: { id: reviewId } });
    if (!deletedReview) {
      return sendResponse(res, 404, "Review not found", null);
    }
    sendResponse(res, 200, "Review deleted successfully", null);
  } catch (error) {
    console.error("Error deleting review:", error);
    sendResponse(res, 500, error.message, null);
  }
};
