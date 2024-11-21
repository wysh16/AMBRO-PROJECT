const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Lấy tất cả đơn hàng
router.get("/", orderController.getAllOrders);

// Lấy chi tiết đơn hàng theo ID
router.get("/:id", orderController.getOrderById);

// Tạo mới đơn hàng
router.post("/", orderController.createOrder);

// Cập nhật đơn hàng theo ID
router.put("/:id", orderController.updateOrder);

// Xóa đơn hàng theo ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
