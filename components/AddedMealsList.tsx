import React from "react";

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
  return (
    <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md mt-2">
      <h3>Dodane posiłki</h3>
      {meals.length === 0 ? (
        <p>Nie dodano jeszcze żadnych posiłków.</p>
      ) : (
        <ul>
          {meals.map((meal, index) => (
            <li key={index} className="meal-item">
              <div className="meal-header">
                <strong>{meal.name}</strong>
                {meal.favorite && <span className="favorite-badge">★ Ulubiony</span>}
              </div>
              <div>
                <span>Kalorie: {meal.calories} kcal</span> |
                <span> Kategoria: {meal.category || "Brak"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};