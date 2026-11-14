import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  weightInGrams: number;
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
}

export interface Meal {
  id: number;
  name: string;
  products: Product[];
  calories: number;
  category?: string;
  favorite?: boolean;
  water?: number;
}

export interface Day {
  id: number;
  name: string;
  meals: Meal[];
}

export interface CaloriesState {
  days: Day[];
  calorieGoal: number;
  waterGoal: number;
  waterByDay: Record<number, number>;

  setCalorieGoal(goal: number): void;
  setWaterGoal(goal: number): void;
  setWaterIntake(dayId: number, amount: number): void;
  addWaterIntake(dayId: number, amount: number): void;
  addProductToMeal(dayId: Day["id"], mealId: Meal["id"], product: Product): void;
  deleteProductFromMeal(dayId: Day["id"], mealId: Meal["id"], productId: Product["id"]): void;
}

export const initialDays: Day[] = [
  {
    id: 1,
    name: "Monday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 2,
    name: "Tuesday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 3,
    name: "Wednesday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 4,
    name: "Thursday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 5,
    name: "Friday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 6,
    name: "Saturday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
  {
    id: 7,
    name: "Sunday",
    meals: [
      { id: 1, name: "Breakfast", products: [], calories: 0 },
      { id: 2, name: "Second Breakfast", products: [], calories: 0 },
      { id: 3, name: "Lunch", products: [], calories: 0 },
      { id: 4, name: "Afternoon Snack", products: [], calories: 0 },
      { id: 5, name: "Dinner", products: [], calories: 0 },
    ],
  },
];

export function getCurrentDayId(): number {
  const day = new Date().getDay();
  return day === 0 ? 7 : day;
}

export const useCaloriesStore = create<CaloriesState>()(
  persist(
    (set) => ({
      days: initialDays,
      calorieGoal: 2000,
      waterGoal: 2000,
      waterByDay: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },

      setCalorieGoal(goal) {
        set({ calorieGoal: Math.max(0, goal) });
      },

      setWaterGoal(goal) {
        set({ waterGoal: Math.max(0, goal) });
      },

      setWaterIntake(dayId, amount) {
        set((state) => ({
          waterByDay: {
            ...state.waterByDay,
            [dayId]: Math.max(0, amount),
          },
        }));
      },

      addWaterIntake(dayId, amount) {
        set((state) => ({
          waterByDay: {
            ...state.waterByDay,
            [dayId]: Math.max(0, (state.waterByDay[dayId] || 0) + amount),
          },
        }));
      },

      addProductToMeal(dayId, mealId, product) {
        set((state) => ({
          days: state.days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  meals: day.meals.map((meal) => {
                    if (meal.id !== mealId) return meal;
                    const newProducts = [...meal.products, product];
                    const totalCalories = Math.round(
                      newProducts.reduce((sum, p) => sum + (parseFloat(p.calories) || 0), 0)
                    );
                    return {
                      ...meal,
                      products: newProducts,
                      calories: totalCalories,
                    };
                  }),
                }
              : day
          ),
        }));
      },

      deleteProductFromMeal(dayId, mealId, productId) {
        set((state) => ({
          days: state.days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  meals: day.meals.map((meal) => {
                    if (meal.id !== mealId) return meal;
                    const newProducts = meal.products.filter(
                      (product) => product.id !== productId
                    );
                    const totalCalories = Math.round(
                      newProducts.reduce((sum, p) => sum + (parseFloat(p.calories) || 0), 0)
                    );
                    return {
                      ...meal,
                      products: newProducts,
                      calories: totalCalories,
                    };
                  }),
                }
              : day
          ),
        }));
      },
    }),
    {
      name: "fitlife-calories-store",
    }
  )
);
