const KhuyenMai = require("../models/khuyenmai");
const mongoose = require("mongoose");

// Thêm khuyến mãi mới
exports.addKhuyenMai = async (req, res) => {
  try {
    const model = req.body;
    const promotion = new KhuyenMai({ ...model });
    await promotion.save();
    res.status(201).json(promotion.toObject());
  } catch (error) {
    console.error("Error adding promotion:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật khuyến mãi
exports.updateKhuyenMai = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const model = req.body;
    const updated = await KhuyenMai.findByIdAndUpdate(id, model, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json(updated.toObject());
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(500).json({ message: error.message });
  }
};

// Xóa khuyến mãi
exports.deleteKhuyenMai = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deleted = await KhuyenMai.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách tất cả khuyến mãi
exports.getAllKhuyenMai = async (req, res) => {
  try {
    const promotions = await KhuyenMai.find();
    res.json(promotions.map((promo) => promo.toObject()));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết khuyến mãi theo ID
exports.getKhuyenMaiById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const promotion = await KhuyenMai.findById(id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json(promotion.toObject());
  } catch (error) {
    console.error("Error fetching promotion by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
