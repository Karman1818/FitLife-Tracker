import React, { useState } from "react";
import AddProductForm from "./AddProductForm";

interface Meal {
  name: string;
  calories: number;
  category: string;
  favorite: boolean;
}

interface Props {
  meals: Meal[]; // Lista posiłków
}

export default function AddedMealsList({ meals }: Props) {
  const [mealList, setMealList] = useState<Meal[]>(meals);

  const handleAddMeal = (meal: Meal) => {
    setMealList([...mealList, meal]);
  };

  return (
    <>
      <AddProductForm onAddMeal={handleAddMeal} />
      <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md mt-2">
        <h3>Dodane posiłki</h3>
        {mealList.length === 0 ? (
          <p>Nie dodano jeszcze żadnych posiłków.</p>
        ) : (
          mealList.map((meal, index) => (
            <div key={index}>
              <p>{meal.name}</p>
              <p>{meal.calories} kcal</p>
              <p>{meal.category}</p>
              <p>{meal.favorite ? "Favorite" : "Not Favorite"}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}