const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const isAuth = require("../middlewares/isAuth");

// Routes for CRUD operations on reviews
router.post("/", isAuth, reviewController.createReview); // Create a review
router.get("/", reviewController.getAllReviews); // Get all reviews
router.get("/:id", reviewController.getReviewById); // Get review by ID
router.get("/product/:id", reviewController.getProductReviews); // Get review by ID
router.put("/:id",isAuth, reviewController.updateReview); // Update a review
router.delete("/:id",isAuth, reviewController.deleteReview); // Delete a review

module.exports = router;
