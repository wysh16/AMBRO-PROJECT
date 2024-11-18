const mongoose = require("mongoose");
const { Schema } = mongoose;

const khachHangSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  bankAccount: {
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
  },
  status: { type: String },
});

const KhachHang = mongoose.model("khachhangs", khachHangSchema);

module.exports = KhachHang;
