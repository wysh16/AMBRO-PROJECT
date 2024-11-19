const express = require("express");
const router = express.Router();
const userController = require("../controllers/congdong-nguoidung");

// Lấy tất cả người dùng
router.get("/", userController.getAllUsers);

// Cập nhật thông tin người dùng
router.put("/:id", userController.updateUser);

module.exports = router;
