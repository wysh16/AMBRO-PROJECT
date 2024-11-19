const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shipping-controller");

// Lấy danh sách vận chuyển
router.get("/", shippingController.getAllShippings);

// Lấy thông tin vận chuyển theo ID đơn hàng
router.get("/:id", shippingController.getShippingById);

// Tạo mới vận chuyển
router.post("/", shippingController.createShipping);

// Cập nhật thông tin vận chuyển
router.put("/:id", shippingController.updateShipping);

// Xóa vận chuyển
router.delete("/:id", shippingController.deleteShipping);

module.exports = router;
