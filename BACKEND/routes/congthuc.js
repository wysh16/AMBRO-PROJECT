const express = require("express");
const {
  addCongThuc,
  updateCongThuc,
  deleteCongThuc,
  getAllCongThuc,
  getCongThuc,
} = require("../controllers/congthuc.controller");
const router = express.Router();

router.post("/", async (req, res) => {
  model = req.body;
  let congthuc = await addCongThuc(model);
  res.send(congthuc);
});

// PUT: Cập nhật công thức
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const model = req.body;

  try {
    // Tìm và cập nhật công thức
    const updatedCongThuc = await CongThuc.findByIdAndUpdate(
      id,
      model,
      { new: true, runValidators: true } // Trả về tài liệu đã cập nhật
    );

    // Nếu không tìm thấy ID
    if (!updatedCongThuc) {
      return res.status(404).send({ message: "Công thức không tồn tại!" });
    }

    res.send({ message: "Cập nhật thành công!", data: updatedCongThuc });
  } catch (error) {
    console.error("Lỗi cập nhật:", error.message);
    res
      .status(400)
      .send({ message: "Cập nhật thất bại!", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteCongThuc(id);
  res.send({ message: "Deleted" });
});

router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let congthuc = await getCongThuc(id);
  res.send(congthuc);
});

router.get("/", async (req, res) => {
  let id = req.params["model"];
  let congthucs = await getAllCongThuc();
  res.send(congthucs);
});

router.get("/congthuc/:id", async (req, res) => {
  const id = req.params["id"];
  const congthuc = await getCongThuc(id);
  res.send(congthuc);
});

module.exports = router;
