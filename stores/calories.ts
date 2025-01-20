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
  id: number,
  name: string,
  products: Product[];
  calories: number,
}

export interface Day {
  id: number,
  name: string,
  meals: Meal[]
}

interface CaloriesState {
  days: Day[];
  
  addProductToMeal(dayId: Day["id"], mealId: Meal["id"], product: Product): void;
  
  deleteProductFromMeal(dayId: Day["id"], mealId: Meal["id"], productId: Product["id"]): void;
}

export const useCaloriesStore = create<CaloriesState>(set => ({
  days: [
    {
      id: 1,
      name: "Monday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 2,
      name: "Tuesday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 3,
      name: "Wednesday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 4,
      name: "Thursday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 5,
      name: "Friday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 6,
      name: "Saturday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
    {
      id: 7,
      name: "Sunday ",
      meals: [
        { id: 1, name: "Breakfast ", products: [] },
        { id: 2, name: "Second Breakfast ", products: [] },
        { id: 3, name: "Lunch ", products: [] },
        { id: 4, name: "Afternoon Snack ", products: [] },
        { id: 5, name: "Dinner ", products: [] },
      ],
    },
  ] satisfies Day[],
  
  addProductToMeal(dayId, mealId, product) {
    set((state) => ({
      days: state.days.map(function(day) {
        return day.id === dayId
          ? {
            ...day,
            meals: day.meals.map(function(meal) {
              return meal.id === mealId
                ? { ...meal, products: [...meal.products, product], }
                : meal;
            }),
          }
          : day;
      }),
    }));
  },
  
  deleteProductFromMeal(dayId, mealId, productId) {
    set((state) => ({
      days: state.days.map(function(day) {
        return day.id === dayId
          ? {
            ...day,
            meals: day.meals.map(function(meal) {
              return meal.id === mealId
                ? {
                  ...meal,
                  products: meal.products.filter((product) => product.id !== productId),
                }
                : meal;
            }),
          }
          : day;
      }),
    }));
  }
}));