import React from "react";
import "../styles/AddedMealsList.css"

interface Meal {
  name: string;
  calories: number;
  category: string;
  favorite: boolean;
}

interface AddedMealsListProps {
  meals: Meal[]; // Lista posiłków
}

const AddedMealsList: React.FC<AddedMealsListProps> = ({ meals }) => {
  return (
    <div className="added-meals-list">
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

export default AddedMealsList;
