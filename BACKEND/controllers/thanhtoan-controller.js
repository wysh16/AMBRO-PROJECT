// controllers/thanhToanController.js
const ThanhToan = require("../models/thanhtoan");

// Lấy tất cả thông tin thanh toán
exports.getAllThanhToan = async (req, res) => {
  try {
    const thanhToans = await ThanhToan.find();
    res.status(200).json(thanhToans);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy thông tin thanh toán", error });
  }
};

// Lấy thanh toán theo ID đơn hàng
exports.getThanhToanById = async (req, res) => {
  try {
    const thanhToan = await ThanhToan.findOne({ ID_Donhang: req.params.id });
    if (!thanhToan) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin thanh toán" });
    }
    res.status(200).json(thanhToan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy thông tin thanh toán", error });
  }
};

// Thêm thông tin thanh toán mới
exports.createThanhToan = async (req, res) => {
  try {
    const {
      ID_Donhang,
      TenKhachHang,
      ID_KhachHang,
      PhuongThucThanhToan,
      TinhTrangThanhToan,
    } = req.body;

    // Kiểm tra xem đơn hàng đã có thông tin thanh toán hay chưa
    const existingThanhToan = await ThanhToan.findOne({ ID_Donhang });
    if (existingThanhToan) {
      return res
        .status(400)
        .json({ message: "Đơn hàng đã có thông tin thanh toán" });
    }

    const thanhToan = new ThanhToan({
      ID_Donhang,
      TenKhachHang,
      ID_KhachHang,
      PhuongThucThanhToan,
      TinhTrangThanhToan,
    });

    await thanhToan.save();
    res
      .status(201)
      .json({
        message: "Thông tin thanh toán đã được thêm thành công",
        thanhToan,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi tạo thanh toán", error });
  }
};

// Cập nhật tình trạng thanh toán
exports.updateTinhTrangThanhToan = async (req, res) => {
  try {
    const { ID_Donhang, TinhTrangThanhToan } = req.body;

    const thanhToan = await ThanhToan.findOneAndUpdate(
      { ID_Donhang },
      { TinhTrangThanhToan },
      { new: true }
    );

    if (!thanhToan) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin thanh toán để cập nhật" });
    }

    res
      .status(200)
      .json({ message: "Tình trạng thanh toán đã được cập nhật", thanhToan });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Có lỗi xảy ra khi cập nhật tình trạng thanh toán",
        error,
      });
  }
};
