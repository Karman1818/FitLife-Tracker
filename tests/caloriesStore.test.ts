import { describe, it, expect, beforeEach } from "vitest";
import { useCaloriesStore } from "@/stores/calories";

describe("Calories Store (Zustand)", () => {
  beforeEach(() => {
    // Reset store state before each test
    const initialDays = [
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
    ];
    useCaloriesStore.setState({ days: initialDays });
  });

  it("should initialize with the defined days and meals", () => {
    const days = useCaloriesStore.getState().days;
    expect(days.length).toBeGreaterThanOrEqual(2);
    expect(days[0].name).toBe("Monday");
    expect(days[0].meals.length).toBe(5);
  });

  it("should add a product to a meal and calculate total calories", () => {
    const { addProductToMeal } = useCaloriesStore.getState();

    const product1 = {
      id: 101,
      name: "Oatmeal",
      weightInGrams: 80,
      calories: "300",
      protein: "10",
      carbohydrates: "50",
      fat: "5",
    };

    addProductToMeal(1, 1, product1);

    const meal = useCaloriesStore.getState().days[0].meals[0];
    expect(meal.products).toHaveLength(1);
    expect(meal.products[0].name).toBe("Oatmeal");
    expect(meal.calories).toBe(300);
  });

  it("should accumulate calories when adding multiple products", () => {
    const { addProductToMeal } = useCaloriesStore.getState();

    addProductToMeal(1, 1, {
      id: 101,
      name: "Eggs",
      weightInGrams: 100,
      calories: "140",
      protein: "12",
      carbohydrates: "1",
      fat: "10",
    });

    addProductToMeal(1, 1, {
      id: 102,
      name: "Whole Wheat Bread",
      weightInGrams: 60,
      calories: "160",
      protein: "6",
      carbohydrates: "28",
      fat: "2",
    });

    const meal = useCaloriesStore.getState().days[0].meals[0];
    expect(meal.products).toHaveLength(2);
    expect(meal.calories).toBe(300);
  });

  it("should delete a product and subtract its calories", () => {
    const { addProductToMeal, deleteProductFromMeal } = useCaloriesStore.getState();

    addProductToMeal(1, 3, {
      id: 201,
      name: "Chicken Breast",
      weightInGrams: 200,
      calories: "330",
      protein: "62",
      carbohydrates: "0",
      fat: "7",
    });

    addProductToMeal(1, 3, {
      id: 202,
      name: "Rice",
      weightInGrams: 150,
      calories: "195",
      protein: "4",
      carbohydrates: "42",
      fat: "1",
    });

    let lunch = useCaloriesStore.getState().days[0].meals[2];
    expect(lunch.calories).toBe(525);

    // Delete Rice (id 202)
    deleteProductFromMeal(1, 3, 202);

    lunch = useCaloriesStore.getState().days[0].meals[2];
    expect(lunch.products).toHaveLength(1);
    expect(lunch.products[0].name).toBe("Chicken Breast");
    expect(lunch.calories).toBe(330);
  });
});
