const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  weight: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: String, required: true },
  label: { type: String, required: true },
});

const Product = mongoose.model("newproducts", productSchema);

module.exports = Product;
