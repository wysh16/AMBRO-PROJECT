const mongoose = require('mongoose');

// Định nghĩa Schema cho Customer
const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'users' // Liên kết với collection Users
  },
  fullName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    ref: 'users' // Liên kết với collection Users
  },
  phoneNumber: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false
  },
  birthDate: {
    type: Date,
    required: false
  },
  avatar: {
    type: String, // URL ảnh đại diện
    required: false
  },
  bank: {
    bankName: {
      type: String,
      required: false
    },
    accountNumber: {
      type: String,
      required: false
    }
  },
  address: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    ref: 'users' // Liên kết với collection Users
  },
  favoriteProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products' // Liên kết với collection Product
      }
    }
  ]
}, { timestamps: true }); // Thêm thời gian createdAt và updatedAt tự động

// Tạo model Customer
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
