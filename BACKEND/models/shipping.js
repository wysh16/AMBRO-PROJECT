const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  ID_Donhang: { type: String, required: true, unique: true },
  TenKhachHang: { type: String, required: true },
  ID_KhachHang: { type: String, required: true },
  PhuongThucVanChuyen: { type: String, required: true },
  NgayVanChuyen: { type: Date, required: true },
  NgayDuKien: { type: Date, required: true },
  TinhTrang: { type: String, required: true },
  DonViVanChuyen: { type: String, required: true },
});

module.exports = mongoose.model("Shipping", shippingSchema);
