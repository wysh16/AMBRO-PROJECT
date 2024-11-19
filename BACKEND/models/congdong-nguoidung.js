const mongoose = require("mongoose");

const NguoiDungSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ten: { type: String, required: true },
  soBaiViet: { type: Number, default: 0 },
  soLanBinhLuan: { type: Number, default: 0 },
  soLanThich: { type: Number, default: 0 },
  trangThai: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model("nguoidung", NguoiDungSchema);
