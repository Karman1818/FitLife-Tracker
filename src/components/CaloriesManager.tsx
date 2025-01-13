import { useCaloriesStore } from "../state/caloriesStore.ts";
import AddProductToMealForm from "./AddProductToMealForm.tsx";
import { useState } from "react";

export const CaloriesManager = () => {

    const Days = useCaloriesStore(state => state.days);
    const deleteProductFromMeal = useCaloriesStore(state => state.deleteProductFromMeal)

    const [openMealForms, setOpenMealForms] = useState<{ [dayId: number]: { [mealId: number]: boolean } }>({});

    const Add = (dayId: number, mealId: number) => {
        setOpenMealForms((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                [mealId]: !prev[dayId]?.[mealId]
            }
        }));
    };

    return (
        <>
            {Days.map((day) => (
                <div key={day.id}>
                    <h1>{day.name}</h1>
                    {day.meals.map((meal) => (
                        <div key={meal.id}>
                            <h2>{meal.name}</h2>
                            <button onClick={() => Add(day.id, meal.id)}>
                                Add new product to your meal
                            </button>

                            {openMealForms[day.id]?.[meal.id] && (
                                <AddProductToMealForm mealId={meal.id} dayId={day.id} />
                            )}

                            {meal.products.length === 0 ? (
                                <p>No products added yet.</p>
                            ) : (
                                meal.products.map((product) => (
                                    <div key={product.id}>
                                        <p>Name: {product.name}</p>
                                        <p>Weight: {product.weightInGrams} grams</p>
                                        <p>Calories: {product.calories}</p>
                                        <p>Protein: {product.protein} g</p>
                                        <p>Carbohydrates: {product.carbohydrates} g</p>
                                        <p>Fat: {product.fat} g</p>
                                        <button onClick={() => deleteProductFromMeal(day.id,meal.id,product.id)}>Delete Product</button>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
