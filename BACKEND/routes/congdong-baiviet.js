const express = require("express");
const router = express.Router();
const hoatDongController = require("../controllers/congdong-baiviet.controller");

// Lấy tất cả hoạt động
router.get("/", hoatDongController.getAllHoatDong);

// Thêm hoạt động mới
router.post("/", hoatDongController.addHoatDong);

module.exports = router;
