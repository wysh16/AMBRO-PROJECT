// controllers/product.controller.js
const Product = require("../models/newProduct");

// Lấy danh sách các sản phẩm mới
const getNewProducts = async (req, res) => {
  try {
    // Tìm các sản phẩm có nhãn 'New'
    const newProducts = await Product.find({ label: "New" });
    res.status(200).json(newProducts); // Trả về danh sách sản phẩm mới
  } catch (err) {
    console.error("Error fetching new products:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Controller để thêm sản phẩm mới
const createProduct = async (req, res) => {
  const { name, price, weight, image, rating, label } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      weight,
      image,
      rating,
      label,
    });
    await newProduct.save();
    res.status(201).json(newProduct); // Trả về sản phẩm mới vừa được tạo
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Controller để lấy một sản phẩm theo ID
const getNewProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

module.exports = { getNewProducts, createProduct, getNewProductById };
