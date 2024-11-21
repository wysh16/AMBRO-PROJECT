// routes/thanhToanRoutes.js
const express = require("express");
const router = express.Router();
const thanhToanController = require("../controllers/thanhtoan.controller");

// Route để lấy tất cả thanh toán
router.get("/", thanhToanController.getAllThanhToan);

// Route để lấy thông tin thanh toán theo ID đơn hàng
router.get("/:id", thanhToanController.getThanhToanById);

// Route để tạo mới thông tin thanh toán
router.post("/", thanhToanController.createThanhToan);

// Route để cập nhật tình trạng thanh toán
router.put("/", thanhToanController.updateTinhTrangThanhToan);

module.exports = router;
