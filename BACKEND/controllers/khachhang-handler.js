const KhachHang = require("../models/khachhang");

async function addKhachHang(model) {
  const khachHang = new KhachHang({
    ...model,
  });
  await khachHang.save();
  return khachHang.toObject();
}

async function updateKhachHang(id, model) {
  await KhachHang.findByIdAndUpdate(id, model);
}

async function deleteKhachHang(id) {
  await KhachHang.findByIdAndDelete(id);
}

async function getAllKhachHang() {
  const khachHangs = await KhachHang.find();
  return khachHangs.map((x) => x.toObject());
}

async function getKhachHang(id) {
  const khachHang = await KhachHang.findById(id);
  return khachHang.toObject();
}

module.exports = {
  addKhachHang,
  updateKhachHang,
  deleteKhachHang,
  getAllKhachHang,
  getKhachHang,
};
