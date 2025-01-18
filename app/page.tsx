"use client";

import { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import AddedMealsList from "@/components/AddedMealsList";
import GoalCard from "@/components/GoalCard";

// TODO: Types
export default function Page() {
  const [goalCalories, setGoalCalories] = useState(2000);
  const [consumedCalories/*, setConsumedCalories*/] = useState(0);
  const [goalWater, setGoalWater] = useState(2500);
  const [consumedWater/*, setConsumedWater*/] = useState(0);
  const [meals/*, setMeals*/] = useState<Parameters<typeof AddedMealsList>[0]["meals"]>([]);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  // Odczytanie wagi i wzrostu z localStorage
  useEffect(() => {
    const storedWeight = localStorage.getItem('weight');
    const storedHeight = localStorage.getItem('height');

    if (storedWeight && storedHeight) {
      setWeight(storedWeight);
      setHeight(storedHeight);
    }
  }, []);

  const caloriePercentage = Math.min(
    (consumedCalories / goalCalories) * 100,
    100,
  );
  const waterPercentage = Math.min((consumedWater / goalWater) * 100, 100);
  
  const remainingCalories = goalCalories - consumedCalories;
  const remainingWater = goalWater - consumedWater;
  
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
      
      <div className="mt-8">
        <h3 className="text-xl text-white mb-4">Twoje dane:</h3>
        <div className="bg-gray-700 p-4 rounded-lg text-white">
          <p><strong>Waga:</strong> {weight ? `${weight} kg` : 'Brak danych'}</p>
          <p><strong>Wzrost:</strong> {height ? `${height} cm` : 'Brak danych'}</p>
        </div>
      </div>
      
      <AddProductForm />
      <AddedMealsList meals={meals} />
    </div>
  );
}
