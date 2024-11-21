// routes/product.routes.js
const express = require("express");
const router = express.Router();
const {
  getNewProducts,
  createProduct,
  getProductById,
} = require("../controllers/newProduct.controller");

// Route để lấy danh sách các sản phẩm mới
router.get("/", getNewProducts);

// Route để tạo một sản phẩm mới
router.post("/", createProduct);

// Route để lấy một sản phẩm theo ID
router.get("/:id", getProductById);

module.exports = router;
