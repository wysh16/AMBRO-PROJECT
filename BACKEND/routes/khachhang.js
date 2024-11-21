const express = require("express");
const {
  addKhachHang,
  updateKhachHang,
  deleteKhachHang,
  getAllKhachHang,
  getKhachHang,
} = require("../controllers/khachhang.controller");

const router = express.Router();

// Create new customer
router.post("/", async (req, res) => {
  const model = req.body;
  const khachHang = await addKhachHang(model);
  res.status(201).send(khachHang);
});

// Update customer by ID
router.put("/:id", async (req, res) => {
  const model = req.body;
  const id = req.params["id"];
  await updateKhachHang(id, model);
  res.send({ message: "Updated successfully" });
});

// Delete customer by ID
router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  await deleteKhachHang(id);
  res.send({ message: "Deleted successfully" });
});

// Get all customers
router.get("/", async (req, res) => {
  const khachHangs = await getAllKhachHang();
  res.send(khachHangs);
});

// Get a customer by ID
router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  const khachHang = await getKhachHang(id);
  res.send(khachHang);
});

module.exports = router;
