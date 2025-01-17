"use client";

import { useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import AddedMealsList from "@/components/AddedMealsList";
import GoalCard from "@/components/GoalCard";

export const runtime = "edge";

// TODO: Types
export default function Page() {
  const [goalCalories, setGoalCalories] = useState(2000);
  const [consumedCalories/*, setConsumedCalories*/] = useState(0);
  const [goalWater, setGoalWater] = useState(2500);
  const [consumedWater/*, setConsumedWater*/] = useState(0);
  const [meals/*, setMeals*/] = useState<Parameters<typeof AddedMealsList>[0]["meals"]>([]);
  
  const caloriePercentage = Math.min(
    (consumedCalories / goalCalories) * 100,
    100,
  );
  const waterPercentage = Math.min((consumedWater / goalWater) * 100, 100);
  
  const remainingCalories = goalCalories - consumedCalories;
  const remainingWater = goalWater - consumedWater;
  
  // const handleAddProduct = (product: any) => {
  //   setConsumedCalories((prev) => prev + product.calories);
  //   setConsumedWater((prev) => prev + product.water);
  //   setMeals((prevMeals) => [...prevMeals, product]);
  // };
  
  return (
    <div>
      <div className="grid grid-cols-2 sm:flex">
        <GoalCard
          title="Spożyte Kalorie"
          percentage={caloriePercentage}
          goal={goalCalories}
          setGoal={setGoalCalories}
          unit="kcal"
          value={consumedCalories}
          remainingValue={remainingCalories}
        />
        <GoalCard
          title="Spożyta Woda"
          percentage={waterPercentage}
          goal={goalWater}
          setGoal={setGoalWater}
          unit="ml"
          value={consumedWater}
          remainingValue={remainingWater}
        />
      </div>
      
      <AddProductForm/>
      <AddedMealsList meals={meals}/>
    </div>
  );
};