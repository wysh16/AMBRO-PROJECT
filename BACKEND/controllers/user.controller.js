const User = require('../models/user');

// Lấy thông tin người dùng
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tải thông tin người dùng', error: err.message });
  }
};

// Cập nhật hồ sơ người dùng
const updateUserProfile = async (req, res) => {
  const { fullName, phone, gender, dateOfBirth, address, banks } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { fullName, phone, gender, dateOfBirth, address, banks },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    res.json({ message: 'Cập nhật hồ sơ thành công', user });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật hồ sơ', error: err.message });
  }
};

module.exports = {
  getUser,
  updateUserProfile,
};
