const Meal = require("../models/meal");

exports.createMeal = async (req, res) => {
  try {
    const {
      mealType,
      mealName,
      mealCalories,
      mealIngredients,
      mealImage,
      mealRecipe,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !mealType ||
      !mealName ||
      !mealCalories ||
      !mealIngredients ||
      !mealImage ||
      !mealRecipe
    ) {
      return res
        .status(400)
        .json({ message: "Missing required meal information" });
    }

    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    console.error("Error creating meal:", err); // Log lỗi để theo dõi
    res.status(400).json({ message: err.message });
  }
};

// Lấy tất cả thực đơn
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả các mealIngredients duy nhất
exports.getUniqueIngredients = async (req, res) => {
  try {
    const meals = await Meal.find();
    const ingredientsSet = new Set();

    meals.forEach((meal) => {
      const ingredients = meal.mealIngredients.split("\n");
      ingredients.forEach((ingredient) =>
        ingredientsSet.add(ingredient.trim())
      );
    });

    const uniqueIngredients = Array.from(ingredientsSet);
    res.json(uniqueIngredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BẢN NÀY OK
exports.getMealPlan = async (req, res) => {
  try {
    const { dailyCalories, days, excludedIngredients } = req.body;

    // Lấy tất cả món ăn phù hợp với điều kiện
    const meals = await Meal.find({
      mealCalories: { $lte: dailyCalories },
      // mealIngredients: { $nin: excludedIngredients },
      mealIngredients: {
        $nin: excludedIngredients.map((ingredient) => ingredient.toLowerCase()),
      },
    });

    if (!meals || meals.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy món ăn phù hợp." });
    }

    const mealPlan = [];
    const usedMeals = {
      breakfast: new Set(),
      lunch: new Set(),
      dinner: new Set(),
    }; // Lưu món đã chọn cho từng loại bữa

    for (let i = 0; i < days; i++) {
      let remainingCalories = dailyCalories;
      const dailyMeals = {
        day: i + 1,
        breakfast: null,
        lunch: null,
        dinner: null,
      };

      dailyMeals.breakfast = selectUniqueMeal(
        meals,
        "Bữa sáng",
        remainingCalories * 0.3,
        usedMeals.breakfast
      );
      remainingCalories -= dailyMeals.breakfast
        ? dailyMeals.breakfast.mealCalories
        : 0;

      dailyMeals.lunch = selectUniqueMeal(
        meals,
        "Bữa trưa",
        remainingCalories * 0.5,
        usedMeals.lunch
      );
      remainingCalories -= dailyMeals.lunch ? dailyMeals.lunch.mealCalories : 0;

      dailyMeals.dinner = selectUniqueMeal(
        meals,
        "Bữa tối",
        remainingCalories,
        usedMeals.dinner
      );

      mealPlan.push(dailyMeals);
    }

    res.json({ mealPlan });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Hàm hỗ trợ: chọn món ăn duy nhất cho từng loại bữa
function selectUniqueMeal(meals, mealType, targetCalories, usedMeals) {
  let bestMeal = null;
  let closestCalories = Infinity;

  for (const meal of meals) {
    if (meal.mealType === mealType && !usedMeals.has(meal._id)) {
      const diff = Math.abs(meal.mealCalories - targetCalories);
      if (diff < closestCalories) {
        closestCalories = diff;
        bestMeal = meal;
      }
    }
  }

  // Nếu chọn được món ăn, đánh dấu là đã sử dụng
  if (bestMeal) {
    usedMeals.add(bestMeal._id);
  }

  return bestMeal;
}

// Lấy thông tin món ăn theo ID
exports.getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Không tìm thấy món ăn" });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin món ăn", error });
  }
};

// Thêm một món ăn mới
exports.createMeal = async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm món ăn", error });
  }
};

// Cập nhật món ăn
exports.updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMeal) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy món ăn để cập nhật" });
    }
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật món ăn", error });
  }
};

// Xóa món ăn
exports.deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Không tìm thấy món ăn để xóa" });
    }
    res.status(200).json({ message: "Xóa món ăn thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa món ăn", error });
  }
};
