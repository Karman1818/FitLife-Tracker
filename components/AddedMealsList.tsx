import React, { useState } from "react";
import { Meal } from "@/stores/calories";
import AddProductForm from "./AddProductForm";
import GoalCard from "./GoalCard";

interface Props {
  meals: Meal[];
}

export default function AddedMealsList({ meals }: Props) {
  const [mealList, setMealList] = useState<Meal[]>(meals);

  const handleAddMeal = (meal: Meal) => {
    setMealList((prev) => [...prev, meal]);
  };

  const totalCalories = mealList.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0);
  const totalWater = mealList.reduce((sum, meal) => sum + (Number(meal.water) || 0), 0);

  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [waterGoal, setWaterGoal] = useState(2000);

  const caloriePercentage = calorieGoal > 0 ? Math.min(100, Math.max(0, (totalCalories / calorieGoal) * 100)) : 0;
  const waterPercentage = waterGoal > 0 ? Math.min(100, Math.max(0, (totalWater / waterGoal) * 100)) : 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <GoalCard
          title="Daily Calorie Goal"
          percentage={caloriePercentage}
          goal={calorieGoal}
          setGoal={setCalorieGoal}
          unit="kcal"
          value={totalCalories}
          remainingValue={Math.max(0, calorieGoal - totalCalories)}
        />

        <GoalCard
          title="Daily Water Goal"
          percentage={waterPercentage}
          goal={waterGoal}
          setGoal={setWaterGoal}
          unit="ml"
          value={totalWater}
          remainingValue={Math.max(0, waterGoal - totalWater)}
        />
      </div>

      <div className="mt-4">
        <AddProductForm onAddMeal={handleAddMeal} />
      </div>

      <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-4 rounded-xl space-y-3 backdrop-blur-md mt-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Added Meals</h3>
        {mealList.length === 0 ? (
          <p className="text-white/60 italic py-2">There are no meals added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {mealList.map((meal, index) => (
              <div key={meal.id || index} className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1">
                <div className="font-semibold text-lg text-white/90">{meal.name}</div>
                <div className="text-sm text-green-400 font-medium">{meal.calories} kcal</div>
                {meal.category && <div className="text-xs text-white/60">Category: {meal.category}</div>}
                {meal.water ? <div className="text-xs text-blue-300">{meal.water} ml water</div> : null}
                {meal.favorite && <div className="text-xs text-yellow-400">★ Favorite</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
