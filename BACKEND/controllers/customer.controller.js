const Customer = require('../models/Customer');

// Hàm lưu thông tin khách hàng
exports.saveCustomer = async (req, res) => {
  try {
    const { name, email, addresses, banks } = req.body;

    // Kiểm tra thông tin cần thiết
    if (!name || !email) {
      return res.status(400).json({ message: 'Tên và email là bắt buộc!' });
    }

    // Tạo mới đối tượng khách hàng
    const newCustomer = new Customer({
      name,
      email,
      addresses,
      banks,
    });

    // Lưu khách hàng vào MongoDB
    await newCustomer.save();

    return res.status(201).json({ message: 'Hồ sơ đã được lưu thành công!', customer: newCustomer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};
