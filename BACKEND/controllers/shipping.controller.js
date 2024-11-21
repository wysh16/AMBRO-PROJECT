const Shipping = require("../models/shipping");

// Lấy danh sách vận chuyển
exports.getAllShippings = async (req, res) => {
  try {
    const shippings = await Shipping.find();
    res.status(200).json(shippings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách vận chuyển", error });
  }
};

// Lấy thông tin vận chuyển theo ID đơn hàng
exports.getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipping = await Shipping.findOne({ ID_Donhang: id });
    if (!shipping) {
      return res.status(404).json({ message: "Không tìm thấy vận chuyển" });
    }
    res.status(200).json(shipping);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy thông tin vận chuyển", error });
  }
};

// Tạo mới vận chuyển
exports.createShipping = async (req, res) => {
  try {
    const shipping = new Shipping(req.body);
    await shipping.save();
    res.status(201).json({ message: "Tạo vận chuyển thành công", shipping });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo vận chuyển", error });
  }
};

// Cập nhật thông tin vận chuyển
exports.updateShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShipping = await Shipping.findOneAndUpdate(
      { ID_Donhang: id },
      req.body,
      { new: true }
    );
    if (!updatedShipping) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vận chuyển để cập nhật" });
    }
    res
      .status(200)
      .json({ message: "Cập nhật vận chuyển thành công", updatedShipping });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật vận chuyển", error });
  }
};

// Xóa vận chuyển
exports.deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShipping = await Shipping.findOneAndDelete({ ID_Donhang: id });
    if (!deletedShipping) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vận chuyển để xóa" });
    }
    res.status(200).json({ message: "Xóa vận chuyển thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa vận chuyển", error });
  }
};
