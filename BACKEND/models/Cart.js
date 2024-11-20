const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference đến bảng Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      selected: {
        type: Boolean,
        default: false, // Mặc định là chưa chọn
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
