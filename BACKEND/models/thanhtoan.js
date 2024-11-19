// models/ThanhToan.js
const mongoose = require("mongoose");

// Schema cho Thanh Toán
const thanhToanSchema = new mongoose.Schema(
  {
    ID_Donhang: { type: String, required: true },
    TenKhachHang: { type: String, required: true },
    ID_KhachHang: { type: String, required: true },
    PhuongThucThanhToan: { type: String, required: true },
    TinhTrangThanhToan: { type: String, required: true },
  },
  {
    timestamps: true, // Tự động thêm trường createdAt và updatedAt
  }
);

// Tạo model từ schema
const ThanhToan = mongoose.model("ThanhToan", thanhToanSchema);

module.exports = ThanhToan;
