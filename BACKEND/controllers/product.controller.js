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
    const { category, minPrice, maxPrice, search } = req.query;

    // Tạo query điều kiện lọc
    const query = {};

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }



    if (search) {
      // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa/thường)
      query.name = { $regex: search, $options: 'i' }; 
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

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Thêm sản phẩm thành công!", product });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm!", error: err });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật!" });
    }

    res
      .status(200)
      .json({
        message: "Cập nhật sản phẩm thành công!",
        product: updatedProduct,
      });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm!", error: err });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa!" });
    }

    res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công!", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm!", error: err });
  }
};


// Hàm tìm kiếm sản phẩm theo từ khóa
exports.searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    const products = await Product.find({
      name: { $regex: searchTerm, $options: 'i' }, // Tìm kiếm không phân biệt chữ hoa thường
    }).limit(10); // Giới hạn kết quả tìm kiếm (ví dụ: 10 sản phẩm)

    res.json(products); // Trả về danh sách sản phẩm tìm được
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
