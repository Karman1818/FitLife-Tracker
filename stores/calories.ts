import { create } from "zustand";

interface Product {
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

interface CaloriesState {
  days: Day[];

  addProductToMeal(dayId: Day["id"], mealId: Meal["id"], product: Product): void;

  deleteProductFromMeal(dayId: Day["id"], mealId: Meal["id"], productId: Product["id"]): void;
}

export const useCaloriesStore = create<CaloriesState>((set) => ({
  days: [
    {
      id: 1,
      name: "Monday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 2,
      name: "Tuesday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 3,
      name: "Wednesday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 4,
      name: "Thursday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 5,
      name: "Friday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 6,
      name: "Saturday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
    {
      id: 7,
      name: "Sunday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [], calories: 0 },
        { id: 2, name: "Second Breakfast ", products: [], calories: 0 },
        { id: 3, name: "Lunch ", products: [], calories: 0 },
        { id: 4, name: "Afternoon Snack ", products: [], calories: 0 },
        { id: 5, name: "Dinner ", products: [], calories: 0 },
      ],
    },
  ] satisfies Day[],

  addProductToMeal(dayId, mealId, product) {
    set((state) => ({
      days: state.days.map((day) =>
          day.id === dayId
              ? {
                ...day,
                meals: day.meals.map((meal) =>
                    meal.id === mealId
                        ? { ...meal, products: [...meal.products, product] }
                        : meal
                ),
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
                meals: day.meals.map((meal) =>
                    meal.id === mealId
                        ? {
                          ...meal,
                          products: meal.products.filter(
                              (product) => product.id !== productId
                          ),
                        }
                        : meal
                ),
              }
              : day
      ),
    }));
  },
}));
