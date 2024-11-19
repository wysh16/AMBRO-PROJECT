const HoatDong = require("../models/congdong-baiviet");

// Lấy danh sách hoạt động
exports.getAllHoatDong = async (req, res) => {
  try {
    const hoatDongList = await HoatDong.find();
    res.status(200).json(hoatDongList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy dữ liệu hoạt động", error: err });
  }
};

// Thêm hoạt động mới
exports.addHoatDong = async (req, res) => {
  try {
    const newHoatDong = new HoatDong(req.body);
    await newHoatDong.save();
    res
      .status(201)
      .json({ message: "Thêm hoạt động thành công", data: newHoatDong });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm hoạt động", error: err });
  }
};
