// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   isAdmin: Boolean,

// });

// const User = mongoose.model("users", userSchema);

// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },

  // Thông tin bổ sung
  fullName: { type: String, default: null },
  phone: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
 
  address: { type: String, default: null },
  bank: { type: String, default: null },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
