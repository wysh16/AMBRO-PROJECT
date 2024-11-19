// routes/meals.js
const express = require("express");
const router = express.Router();
const mealController = require("../controllers/meal.controller");

// Route để thêm một thực đơn mới
router.post("/meal", mealController.createMeal);

// Route để lấy tất cả thực đơn
router.get("/meal", mealController.getAllMeals);

// Route để lấy tất cả mealIngredients duy nhất
router.get("/ingredients", mealController.getUniqueIngredients);

router.post("/meal-plan", mealController.getMealPlan);

// t thêm đại khúc dứ để làm admin á :(

// Lấy danh sách tất cả các món ăn
router.get("/", mealController.getAllMeals);

// Lấy thông tin một món ăn theo ID
router.get("/:id", mealController.getMealById);

// Thêm một món ăn mới
router.post("/", mealController.createMeal);

// Cập nhật món ăn theo ID
router.put("/:id", mealController.updateMeal);

// Xóa món ăn theo ID
router.delete("/:id", mealController.deleteMeal);

module.exports = router;
