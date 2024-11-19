const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ID_SanPham: { type: String, required: true },
  TenSanPham: { type: String, required: true },
  SoLuong: { type: Number, required: true },
  Dongia: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  ID_Donhang: { type: String, required: true, unique: true },
  ID_Khachhang: { type: String, required: true },
  Tinhtrang: { type: String, required: true },
  SanPham: [productSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
