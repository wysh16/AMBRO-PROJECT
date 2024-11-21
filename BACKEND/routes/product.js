const express = require("express");
const productController = require("../controllers/product.controller");

// getProducts

// const {
//     addCongThuc,
//     updateCongThuc,
//     deleteCongThuc,
//     getAllCongThuc,
//     getCongThuc,
//   } = require("../controllers/congthuc-handler");
const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Lấy sản phẩm theo ID từ MongoDB
    if (!product) return res.status(404).send("Sản phẩm không tồn tại.");
    res.send(product); // Trả về dữ liệu sản phẩm
  } catch (err) {
    res.status(500).send("Lỗi khi tải sản phẩm.");
  }
});

// Thêm sản phẩm mới
router.post("/", productController.addProduct);

// Cập nhật sản phẩm
router.put("/:id", productController.updateProduct);

// Xóa sản phẩm
router.delete("/:id", productController.deleteProduct);



// API tìm kiếm sản phẩm
router.get("/", productController.searchProducts);
module.exports = router;

