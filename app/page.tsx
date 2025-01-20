"use client";

import { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import AddedMealsList from "@/components/AddedMealsList";
import GoalCard from "@/components/GoalCard";
import { Meal } from "@/stores/calories";

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


  
  return (
      <div>
        <AddedMealsList meals={meals}/>
        <div className="mt-8">
          <h3 className="text-xl text-white mb-4">Your stats:</h3>
          <div className="bg-gray-700 p-4 rounded-lg text-white">
            <p><strong>Waga:</strong> {weight ? `${weight} kg` : 'Brak danych'}</p>
            <p><strong>Wzrost:</strong> {height ? `${height} cm` : 'Brak danych'}</p>
          </div>
        </div>
      </div>
  );
}
