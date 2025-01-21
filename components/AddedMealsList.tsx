import React, { useState } from "react";
import { Meal } from "@/stores/calories";
import AddProductForm from "./AddProductForm";
import GoalCard from "./GoalCard";  // Zaimportuj komponent GoalCard

interface Props {
    meals: Meal[];
}

export default function AddedMealsList({ meals }: Props) {
    const [mealList, setMealList] = useState<Meal[]>(meals);

    const handleAddMeal = (meal: Meal) => {
        setMealList([...mealList, meal]);
    };

    // Obliczanie sumy kalorii i wody z zabezpieczeniem na undefined
    const totalCalories = mealList.reduce((sum, meal) => sum + meal.calories, 0);
    const totalWater = mealList.reduce((sum, meal) => sum + (meal.water ?? 0), 0);  // Używamy 0, gdy water jest undefined

    // Przykład celu kalorycznego i celu wody
    const [calorieGoal, setCalorieGoal] = useState(2000);
    const [waterGoal, setWaterGoal] = useState(2000);  // Nowy cel na wodę
    const caloriePercentage = (totalCalories / calorieGoal) * 100;
    const waterPercentage = (totalWater / waterGoal) * 100;  // Procent osiągniętej wody

    return (
        <>
            <div className="grid grid-cols-2 sm:flex">
                <GoalCard
                    title="Daily Calorie Goal"
                    percentage={caloriePercentage}
                    goal={calorieGoal}
                    setGoal={setCalorieGoal}
                    unit="kcal"
                    value={totalCalories}
                    remainingValue={calorieGoal - totalCalories}
                />

                <GoalCard
                    title="Daily Water Goal"
                    percentage={waterPercentage}
                    goal={waterGoal}
                    setGoal={setWaterGoal}
                    unit="ml"
                    value={totalWater}
                    remainingValue={waterGoal - totalWater}
                />
            </div>

            <AddProductForm onAddMeal={handleAddMeal}/>

            <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md mt-2">
                <h3>Added meals</h3>
                {mealList.length === 0 ? (
                    <p>There are no meals added yet.</p>
                ) : (
                    mealList.map((meal, index) => (
                        <div key={index} className="meal-item">
                            <p>{meal.name}</p>
                            <p>{meal.calories} kcal</p>
                            <p>{meal.category}</p>
                            <p>{meal.favorite ? "Favorite" : "Not Favorite"}</p>
                            <p>{meal.water ?? 0} ml of water</p>  {/* Zabezpieczenie przed undefined */}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
