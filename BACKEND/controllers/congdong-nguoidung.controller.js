const User = require("../models/congdong-nguoidung");

// Lấy danh sách người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy dữ liệu người dùng", error: err });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Cập nhật thành công", data: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật người dùng", error: err });
  }
};
