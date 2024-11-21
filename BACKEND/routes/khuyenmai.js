const express = require("express");
const router = express.Router();
const khuyenmaiController = require("../controllers/khuyenmai.controller");

// Thêm khuyến mãi
router.post("/add", khuyenmaiController.addKhuyenMai);

// Cập nhật khuyến mãi
router.put("/:id", khuyenmaiController.updateKhuyenMai);

// Xóa khuyến mãi
router.delete("/:id", khuyenmaiController.deleteKhuyenMai);

// Lấy tất cả khuyến mãi
router.get("/", khuyenmaiController.getAllKhuyenMai);

// Lấy khuyến mãi theo ID
router.get("/:id", khuyenmaiController.getKhuyenMaiById);

module.exports = router;
