// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.confirmPayment = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    // Tạo mã đơn hàng duy nhất
    const orderId = 'ORD' + Date.now();

    // Tạo thanh toán mới
    const payment = new Payment({
      items,
      totalAmount,
      status: 'success', // Cập nhật thành công luôn để đơn giản
      orderId
    });

    await payment.save();

    // Trả về thông tin thanh toán
    res.status(200).json({
      message: 'Thanh toán thành công!',
      orderId: payment.orderId
    });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
};
