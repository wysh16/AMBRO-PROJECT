const mongoose = require("mongoose");

const HoatDongSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  Tacgia: { type: String, required: true },
  Hoatdong: {
    tieude: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  Noidung: { type: String, required: true },
  Hinhanh: { type: String, default: "" },
  trangThai: {
    type: String,
    enum: ["Đã duyệt", "Chờ duyệt", "Không duyệt"],
    default: "Chờ duyệt",
  },
});

module.exports = mongoose.model("HoatDong", HoatDongSchema);
