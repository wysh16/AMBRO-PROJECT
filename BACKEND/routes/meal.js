
// routes/meals.js
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

// Route để thêm một thực đơn mới
router.post('/meal', mealController.createMeal);

// Route để lấy tất cả thực đơn
router.get('/meal', mealController.getAllMeals);

// Route để lấy tất cả mealIngredients duy nhất
router.get('/ingredients', mealController.getUniqueIngredients);

router.post('/meal-plan', mealController.getMealPlan);
module.exports = router;
