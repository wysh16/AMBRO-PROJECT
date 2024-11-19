const Order = require("../models/order");

// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ ID_Donhang: req.params.id });
    if (!order)
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo mới đơn hàng
const createOrder = async (req, res) => {
  const orderData = req.body;
  const order = new Order(orderData);
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { ID_Donhang: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      ID_Donhang: req.params.id,
    });
    if (!deletedOrder)
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
