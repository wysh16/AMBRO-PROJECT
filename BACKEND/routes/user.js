// const express = require("express");
// const {
//   registerUser,
//   updateUserProfile,
// } = require("../controllers/");

// const router = express.Router();

// // Route đăng ký tài khoản
// router.post("/register", registerUser);

// // Route cập nhật thông tin cá nhân
// router.put("/profile", updateUserProfile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Lấy thông tin người dùng
router.get('/:userId', userController.getUser);

// Cập nhật hồ sơ người dùng
router.put('/:userId/profile', userController.updateUserProfile);

module.exports = router;
