import { useCaloriesStore } from "../state/caloriesStore.ts";
import AddProductForm from "./AddProductForm.tsx";
import { useState } from "react";

export const CaloriesManager = () => {

    const Days = useCaloriesStore(state => state.days);
    const addProductToMeal = useCaloriesStore(state => state.addProductToMeal);

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
                        <span key={meal.id}>
                            {meal.name}
                            <button onClick={() => Add(day.id, meal.id)}>Add new product to your meal </button>
                            {openMealForms[day.id]?.[meal.id] && <AddProductForm mealId={meal.id} dayId={day.id} />}
                            {meal.products.map((product) => (
                                <p key={product.id}>
                                    {product.name}
                                </p>
                            ))}
                        </span>
                    ))}
                </div>
            ))}
        </>
    );
}
