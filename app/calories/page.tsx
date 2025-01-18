"use client";

import { useCaloriesStore } from "@/stores/calories";
import AddProductToMealForm from "@/components/AddProductToMealForm";
import { useState } from "react";
import Button from "@/components/averi-ui/button";

export default function Page() {
  const Days = useCaloriesStore(state => state.days);
  const deleteProductFromMeal = useCaloriesStore(state => state.deleteProductFromMeal);
  
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
    <div className="max-w-6xl mx-auto p-1.5 space-y-1.5">
      {Days.map((day) => (
        <div key={day.id}
             className="bg-white/10 border-2 border-white/5 shadow-lg rounded-xl p-6 space-y-4 backdrop-blur-md transition-all hover:bg-white/15">
          <h1 className="text-3xl font-bold text-white/90 border-b border-white/10 pb-2">{day.name}</h1>
          
          <div className="space-y-6">
            {day.meals.map((meal) => (
              <div key={meal.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white/80">{meal.name}</h2>
                  <Button onClick={() => Add(day.id, meal.id)}>
                    Add new product
                  </Button>
                </div>
                
                {openMealForms[day.id]?.[meal.id] && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <AddProductToMealForm mealId={meal.id} dayId={day.id}/>
                  </div>
                )}
                
                {meal.products.length === 0 ? (
                  <p className="text-white/60 italic text-center py-4">No products added yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {meal.products.map((product) => (
                      <div key={product.id}
                           className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-white/90">{product.name}</h3>
                          <div className="space-y-1 text-sm text-white/70">
                            <p className="flex justify-between">
                              <span>Weight:</span>
                              <span className="font-medium">{product.weightInGrams}g</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Calories:</span>
                              <span className="font-medium">{product.calories} kcal</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-medium">{product.protein}g</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-medium">{product.carbohydrates}g</span>
                            </p>
                            <p className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-medium">{product.fat}g</span>
                            </p>
                          </div>
                          <Button
                            onClick={() => deleteProductFromMeal(day.id, meal.id, product.id)}
                            className="before:bg-red-500/20 before:border-red-500/30 hover:before:bg-red-500/30 hover:before:border-red-500/40 before:shadow-[0_4px_3px_0_rgba(220,38,38,0.2),inset_0_-5px_0_0_rgba(255,255,255,0.1)] hover:before:shadow-[0_4px_3px_0_rgba(220,38,38,0.25),inset_0_-5px_0_0_rgba(255,255,255,0.15)]"
                          >
                            Delete Product
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};