const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3000;
const DanhMucRoutes = require("./routes/danhmuc");
const authRoutes = require("./routes/auth");
const Congthuc = require("./routes/congthuc");
const khachHangRoutes = require("./routes/khachhang");
// const KhuyenMai = require("./routes/khuyenmai");
const orderRoutes = require("./routes/order");

const khuyenmaiRoutes = require("./routes/khuyenmai");

const DinhDuongRoutes = require("./routes/dinhduong");
const ProductRoutes = require("./routes/product");

const HotProductRoutes = require("./routes/hotProduct");
const NewProductRoutes = require("./routes/newProduct");
const shippingRoutes = require("./routes/shipping");
const thanhToanRoutes = require("./routes/thanhtoan");

// Import và sử dụng routes
const hoatDongRoutes = require("./routes/congdong-baiviet");
const userRoutes = require("./routes/congdong-nguoidung");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

// --------------------
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const productController = require("./controllers/product.controller");

app.get("/", (req, res) => {
  res.send("Ok");
});

app.get("/categories", productController.getCategories);

app.get("/products", productController.getProducts);

app.get("/products/:id", productController.getProductDetail);

// app.get("/cart-details", (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: "Missing userId parameter" });
//   }

// Tiếp tục xử lý nếu userId tồn tại
// });
// -----------------------

//-----------------------------
// Import các route giỏ hàng
const cartRoutes = require("./routes/cart");

// Sử dụng routes giỏ hàng
app.use("/cart", cartRoutes);
//---------------------------------

const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.use(express.json());
app.get("/", cors(), (req, res) => res.send("Sever running"));

// app.use("/danhmucs", cors(), verifyToken, isAdmin, DanhMucRoutes);
app.use("/auth", cors(), authRoutes);
app.use("/congthuc", cors(), Congthuc);
// app.use("/khuyenmai", cors(), KhuyenMai);

// Routes
app.use("/khuyenmai", cors(), khuyenmaiRoutes);
app.use("/dinhduong", cors(), DinhDuongRoutes);
app.use("/thanhtoan", cors(), thanhToanRoutes);

app.use("/products", cors(), ProductRoutes);
// Routes
app.use("/khachhangs", khachHangRoutes);
app.use("/hot-products", cors(), HotProductRoutes);
app.use("/new-products", cors(), NewProductRoutes);
app.use("/orders", cors(), orderRoutes);
app.use("/shippings", cors(), shippingRoutes);
const mealRoutes = require("./routes/meal");
app.use("/meal", mealRoutes);
app.use("/meal-plan", mealRoutes);

const paymentRoutes = require('./routes/payment');

// Thêm route payment
app.use('/payments', paymentRoutes);


app.use("/baiviets", cors(), hoatDongRoutes);
app.use("/nguoidungs", cors(), userRoutes);

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/?directConnection=true", {
    dbName: "ambro_db",
  });

  console.log("mongodb connected");
}

connectDb().catch((err) => {
  console.error(err);
});

app.listen(port, () => console.log("Sever running on port", port));
