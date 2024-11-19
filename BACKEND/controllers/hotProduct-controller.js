const HotProduct = require("../models/hotProduct");
// Lấy danh sách sản phẩm hot
exports.getHotProducts = async (req, res) => {
  try {
    const hotProducts = await HotProduct.find({ label: "Hot" });
    res.status(200).json(hotProducts);
  } catch (error) {
    console.error("Error fetching hot products:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Lấy chi tiết sản phẩm hot theo ID
exports.getHotProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotProduct = await HotProduct.findById(id);
    if (!hotProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(hotProduct);
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Thêm sản phẩm hot (chỉ dành cho admin)
exports.addHotProduct = async (req, res) => {
  const { name, price, weight, image, rating, label } = req.body;
  try {
    const newHotProduct = new HotProduct({
      name,
      price,
      weight,
      image,
      rating,
      label,
    });
    await newHotProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully!", product: newHotProduct });
  } catch (error) {
    console.error("Error adding hot product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

// Cập nhật sản phẩm hot theo ID
exports.updateHotProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, weight, image, rating, label } = req.body;
  try {
    const updatedProduct = await HotProduct.findByIdAndUpdate(
      id,
      { name, price, weight, image, rating, label },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Xóa sản phẩm hot theo ID
exports.deleteHotProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await HotProduct.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
