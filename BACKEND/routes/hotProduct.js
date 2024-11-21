const express = require("express");
const router = express.Router();
const hotProductController = require("../controllers/hotProduct.controller");
// Route lấy danh sách sản phẩm hot
router.get("/", hotProductController.getHotProducts);

// Route thêm sản phẩm hot (chỉ dành cho admin)
router.post("/", hotProductController.addHotProduct);

// Route lấy chi tiết sản phẩm hot theo ID
router.get("/:id", hotProductController.getHotProductById);

// Route cập nhật sản phẩm hot theo ID (chỉ dành cho admin)
router.put("/:id", hotProductController.updateHotProduct);

// Route xóa sản phẩm hot theo ID (chỉ dành cho admin)
router.delete("/:id", hotProductController.deleteHotProduct);

module.exports = router;
