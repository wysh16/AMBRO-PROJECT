const Payment = require("../models/Payment");

// const Payment = require('../models/Payment');

// exports.createPayment = async (req, res) => {
//   try {
//     const cart = await Cart.findOne().populate('items.productId', 'price');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     const selectedItems = cart.items.filter((item) => item.selected);
//     if (selectedItems.length === 0) {
//       return res.status(400).json({ message: 'No items selected for payment' });
//     }

//     const paymentItems = selectedItems.map((item) => ({
//       productId: item.productId._id,
//       quantity: item.quantity,
//       price: item.productId.price,
//     }));

//     const totalAmount = paymentItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

//     const payment = new Payment({
//       items: paymentItems,
//       totalAmount,
//       orderId: `ORD-${Date.now()}`, // Tạo mã đơn hàng duy nhất
//     });

//     await payment.save();

//     // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng
//     cart.items = cart.items.filter((item) => !item.selected);
//     await cart.save();

//     res.status(201).json({ message: 'Payment created successfully', payment });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.confirmPayment = async (req, res) => {
  const { items } = req.body;

  try {
    // Kiểm tra xem danh sách sản phẩm có tồn tại
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Danh sách sản phẩm không hợp lệ" });
    }

    // Tính tổng tiền từ các sản phẩm
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    // Tạo mã đơn hàng duy nhất
    const orderId = "ORD" + Date.now();

    // Lưu thông tin thanh toán vào cơ sở dữ liệu
    const payment = new Payment({
      items,
      totalAmount,
      status: "success", // Xử lý trạng thái thanh toán
      orderId,
    });

    await payment.save();

    // Trả về thông tin đơn hàng
    res.status(200).json({
      message: "Thanh toán thành công!",
      orderId: payment.orderId,
      totalAmount: payment.totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xử lý thanh toán",
      error: error.message,
    });
  }
};

exports.confirmPayment = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    // Tạo mã đơn hàng duy nhất
    const orderId = "ORD" + Date.now();

    // Tạo thanh toán mới
    const payment = new Payment({
      items,
      totalAmount,
      status: "success", // Cập nhật thành công luôn để đơn giản
      orderId,
    });

    await payment.save();

    // Trả về thông tin thanh toán
    res.status(200).json({
      message: "Thanh toán thành công!",
      orderId: payment.orderId,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
  }
};
