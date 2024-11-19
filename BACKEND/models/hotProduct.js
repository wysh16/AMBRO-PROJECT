const mongoose = require("mongoose");

const hotProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  weight: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: String, default: "0" },
  label: { type: String }, // Optional, dùng để lọc sản phẩm "Hot"
});
{
  collection: "HotProducts";
} // Đặt tên chính xác cho collection
module.exports = mongoose.model("HotProduct", hotProductSchema);
