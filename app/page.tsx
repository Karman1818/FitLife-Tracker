"use client";

import { useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import AddedMealsList from "@/components/AddedMealsList";
import GoalCard from "@/components/GoalCard";

// TODO: Types
export default function Page() {
  const [goalCalories, setGoalCalories] = useState(2000); // Cel kalorii
  const [consumedCalories, setConsumedCalories] = useState(0); // Spożyte kalorie
  const [goalWater, setGoalWater] = useState(2500); // Cel wody w ml
  const [consumedWater, setConsumedWater] = useState(0); // Wypita woda w ml
  const [meals, setMeals] = useState([] as unknown[]); // Lista dodanych posiłków
  
  const caloriePercentage = Math.min(
    (consumedCalories / goalCalories) * 100,
    100,
  );
  const waterPercentage = Math.min((consumedWater / goalWater) * 100, 100);
  
  // Obliczanie pozostałych kalorii i wody do zdobycia celu
  const remainingCalories = goalCalories - consumedCalories;
  const remainingWater = goalWater - consumedWater;
  
  const handleAddProduct = (product: any) => {
    // Aktualizacja kalorii i wody
    setConsumedCalories((prev) => prev + product.calories);
    setConsumedWater((prev) => prev + product.water);
    
    // Dodanie produktu do listy
    setMeals((prevMeals) => [...prevMeals, product]);
  };
  
  return (
    <div>
      <div className="flex">
        <GoalCard
          title="Spożyte Kalorie"
          percentage={caloriePercentage}
          goal={goalCalories}
          setGoal={setGoalCalories}
          unit="kcal"
          value={consumedCalories}
          remainingValue={remainingCalories} // Pozostała liczba kalorii
        />
        <GoalCard
          title="Spożyta Woda"
          percentage={waterPercentage}
          goal={goalWater}
          setGoal={setGoalWater}
          unit="ml"
          value={consumedWater}
          remainingValue={remainingWater} // Pozostała liczba ml wody
        />
      </div>
      
      <AddProductForm onAddProduct={handleAddProduct}/>
      <AddedMealsList meals={meals as any}/>
    </div>
  );
};