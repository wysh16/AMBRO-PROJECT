const Product = require("../models/Product");

// Hàm lấy tất cả các danh mục sản phẩm (distinct)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hàm lấy tất cả sản phẩm theo điều kiện (có thể lọc theo danh mục và giá)
exports.getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    // Tạo query điều kiện lọc
    const query = {};

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hàm lấy chi tiết sản phẩm theo ID
exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsByLabel = async (req, res) => {
  try {
    const { label } = req.query; // Lấy thông tin label từ query string
    const products = await Product.find({ label }).limit(4); // Giới hạn 4 sản phẩm
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy sản phẩm", error: err.message });
  }
};
