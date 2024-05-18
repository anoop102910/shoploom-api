// routes/userRoutes.js
const express = require("express");
const { getProfile, getAllUsers, updateUser, updateProfile } = require("../controllers/user.controller");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get("/profile", isAuth, getProfile);
router.post('/profile', isAuth, updateProfile);
router.get("/", isAuth, getAllUsers);
router.put("/:id", isAuth, updateUser);
module.exports = router;
