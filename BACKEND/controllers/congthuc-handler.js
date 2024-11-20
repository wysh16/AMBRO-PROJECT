const mongoose = require("mongoose"); // Import mongoose
const CongThuc = require("./../models/congthuc");
async function addCongThuc(model) {
  let congthuc = new CongThuc({
    ...model,
  });
  await congthuc.save();
  return congthuc.toObject();
}

async function updateCongThuc(id, model) {
  await CongThuc.findByIdAndUpdate(id, model);
}

async function deleteCongThuc(id) {
  await CongThuc.findByIdAndDelete(id);
}

async function getAllCongThuc() {
  let congthucs = await CongThuc.find();
  return congthucs.map((x) => x.toObject());
}

// async function getCongThuc(id) {
//   let congthuc = await CongThuc.findById(id);
//   return congthuc.toObject();
// }

// async function getCongThuc(id) {
//   let congthuc = await CongThuc.findById(id);
//   if (!congthuc) {
//     throw new Error(`Không tìm thấy công thức với ID: ${id}`);
//   }
//   return congthuc.toObject();
// }

async function getCongThuc(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`ID không hợp lệ: ${id}`);
  }

  let congthuc = await CongThuc.findById(id);
  if (!congthuc) {
    throw new Error(`Không tìm thấy công thức với ID: ${id}`);
  }
  return congthuc.toObject();
}

module.exports = {
  addCongThuc,
  updateCongThuc,
  deleteCongThuc,
  getAllCongThuc,
  getCongThuc,
};
