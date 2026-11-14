"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import {
  useCaloriesStore,
  getCurrentDayId,
  Meal,
  Product,
} from "@/stores/calories";
import GoalCard from "./GoalCard";
import {
  FaPlus,
  FaTrash,
  FaGlassWhiskey,
  FaUtensils,
  FaArrowRight,
  FaCalendarDay,
  FaSearch,
  FaUndo,
} from "react-icons/fa";

interface Props {
  meals?: Meal[];
}

interface ProductOption {
  label: string;
  value: string;
}

export default function AddedMealsList({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeDayId, setActiveDayId] = useState<number>(1);
  const [selectedMealId, setSelectedMealId] = useState<number>(1);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Zustand Store
  const days = useCaloriesStore((state) => state.days);
  const calorieGoal = useCaloriesStore((state) => state.calorieGoal);
  const waterGoal = useCaloriesStore((state) => state.waterGoal);
  const waterByDay = useCaloriesStore((state) => state.waterByDay);
  const setCalorieGoal = useCaloriesStore((state) => state.setCalorieGoal);
  const setWaterGoal = useCaloriesStore((state) => state.setWaterGoal);
  const addWaterIntake = useCaloriesStore((state) => state.addWaterIntake);
  const setWaterIntake = useCaloriesStore((state) => state.setWaterIntake);
  const addProductToMeal = useCaloriesStore((state) => state.addProductToMeal);
  const deleteProductFromMeal = useCaloriesStore((state) => state.deleteProductFromMeal);

  // Form State with strings to prevent stuck zero problem
  const [foodName, setFoodName] = useState("");
  const [weightInGrams, setWeightInGrams] = useState("100");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  // Product Search State
  const [searchResults, setSearchResults] = useState<ProductOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingNutrients, setIsLoadingNutrients] = useState(false);
  const [selectedProductCode, setSelectedProductCode] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    setActiveDayId(getCurrentDayId());
  }, []);

  const activeDay = days.find((d) => d.id === activeDayId) || days[0];
  const activeDayCalories = activeDay
    ? activeDay.meals.reduce((sum, m) => sum + m.calories, 0)
    : 0;
  const activeDayWater = waterByDay[activeDayId] || 0;

  const caloriePercentage =
    calorieGoal > 0
      ? Math.min(100, Math.max(0, (activeDayCalories / calorieGoal) * 100))
      : 0;
  const waterPercentage =
    waterGoal > 0
      ? Math.min(100, Math.max(0, (activeDayWater / waterGoal) * 100))
      : 0;

  // Search OpenFoodFacts
  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFoodName(val);
    setSelectedProductCode("");

    if (val.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          val
        )}&search_simple=1&json=1`
      );
      const data = await res.json();
      if (Array.isArray(data.products)) {
        const options: ProductOption[] = data.products
          .filter((p: { product_name?: string }) => Boolean(p.product_name))
          .slice(0, 6)
          .map((p: { product_name?: string; code?: string; id?: string }) => ({
            label: p.product_name || "Unknown product",
            value: p.code || p.id || "",
          }));
        setSearchResults(options);
      }
    } catch (err) {
      console.error("OpenFoodFacts search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectProduct = async (option: ProductOption) => {
    setFoodName(option.label);
    setSelectedProductCode(option.value);
    setSearchResults([]);

    if (!option.value) return;

    try {
      setIsLoadingNutrients(true);
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(
          option.value
        )}.json`
      );
      const data = await res.json();
      const p = data.product;
      if (p) {
        const kcal100g =
          p.nutriments?.["energy-kcal_100g"] ??
          p.nutriments?.["energy-kcal"] ??
          (p.nutriments?.energy ? Math.round(Number(p.nutriments.energy) / 4.184) : 0);

        const gramNum = parseFloat(weightInGrams) || 100;
        const multiplier = gramNum / 100;

        const calVal = ((Number(kcal100g) || 0) * multiplier).toFixed(1);
        const protVal = ((Number(p.nutriments?.proteins_100g) || 0) * multiplier).toFixed(1);
        const carbVal = ((Number(p.nutriments?.carbohydrates_100g) || 0) * multiplier).toFixed(1);
        const fatVal = ((Number(p.nutriments?.fat_100g) || 0) * multiplier).toFixed(1);

        setCalories(calVal);
        setProtein(protVal);
        setCarbs(carbVal);
        setFat(fatVal);
      }
    } catch (err) {
      console.error("Fetch product details error:", err);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  // Recalculate nutrients when weight in grams changes if product code is known
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWeight = e.target.value;
    setWeightInGrams(newWeight);

    if (selectedProductCode) {
      const gramNum = parseFloat(newWeight);
      if (!isNaN(gramNum) && gramNum > 0) {
        // Trigger re-fetch for new proportion
        selectProduct({ label: foodName, value: selectedProductCode });
      }
    }
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) {
      alert("Please enter a food name");
      return;
    }

    const parsedWeight = parseFloat(weightInGrams);
    const validWeight = !isNaN(parsedWeight) && parsedWeight > 0 ? parsedWeight : 100;

    const newProduct: Product = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: foodName.trim(),
      weightInGrams: validWeight,
      calories: calories || "0",
      protein: protein || "0",
      carbohydrates: carbs || "0",
      fat: fat || "0",
    };

    addProductToMeal(activeDayId, selectedMealId, newProduct);

    // Reset form
    setFoodName("");
    setWeightInGrams("100");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setSelectedProductCode("");
    setSearchResults([]);
  };

  const openFormForMeal = (mealId: number) => {
    setSelectedMealId(mealId);
    setIsFormOpen(true);
  };

  if (!isMounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-white/10 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-64 bg-white/10 rounded-2xl" />
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  const todayId = getCurrentDayId();

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <FaCalendarDay className="text-green-400 w-4 h-4" />
            <span className="font-bold text-base sm:text-lg">Select Day to View & Log</span>
          </div>
          <div className="text-xs text-white/70">
            Current Day: <span className="font-semibold text-green-400">{days.find((d) => d.id === todayId)?.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {days.map((day) => {
            const isSelected = day.id === activeDayId;
            const isToday = day.id === todayId;
            const dayCalories = day.meals.reduce((sum, m) => sum + m.calories, 0);

            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveDayId(day.id)}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all text-xs font-semibold ${
                  isSelected
                    ? "bg-green-600 text-white shadow-lg ring-2 ring-green-400/50 scale-[1.02]"
                    : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span>{day.name}</span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Today" />
                  )}
                </div>
                <span
                  className={`mt-1 text-[11px] font-normal ${
                    isSelected ? "text-green-100" : "text-white/60"
                  }`}
                >
                  {dayCalories} kcal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Goal Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Calorie Goal Card */}
        <GoalCard
          title={`Daily Calories (${activeDay.name})`}
          percentage={caloriePercentage}
          goal={calorieGoal}
          setGoal={setCalorieGoal}
          unit="kcal"
          value={activeDayCalories}
          remainingValue={Math.max(0, calorieGoal - activeDayCalories)}
        >
          <div className="flex items-center justify-between text-xs text-white/70 px-2 pt-1">
            <span>Consumed: <strong className="text-white">{activeDayCalories} kcal</strong></span>
            <span>Remaining: <strong className="text-green-400">{Math.max(0, calorieGoal - activeDayCalories)} kcal</strong></span>
          </div>
        </GoalCard>

        {/* Water Goal Card */}
        <GoalCard
          title={`Daily Water (${activeDay.name})`}
          percentage={waterPercentage}
          goal={waterGoal}
          setGoal={setWaterGoal}
          unit="ml"
          value={activeDayWater}
          remainingValue={Math.max(0, waterGoal - activeDayWater)}
        >
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => addWaterIntake(activeDayId, 250)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 rounded-lg transition-colors font-medium"
              >
                <FaGlassWhiskey className="w-3 h-3" />
                <span>+250ml</span>
              </button>
              <button
                type="button"
                onClick={() => addWaterIntake(activeDayId, 500)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 rounded-lg transition-colors font-medium"
              >
                <FaGlassWhiskey className="w-3 h-3" />
                <span>+500ml</span>
              </button>
              <button
                type="button"
                onClick={() => addWaterIntake(activeDayId, -250)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg transition-colors font-medium"
              >
                <span>-250ml</span>
              </button>
              <button
                type="button"
                onClick={() => setWaterIntake(activeDayId, 0)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-lg transition-colors"
                title="Reset water intake to 0"
              >
                <FaUndo className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-white/70 px-2">
              <span>Drank: <strong className="text-blue-300">{activeDayWater} ml</strong></span>
              <span>Remaining: <strong className="text-white">{Math.max(0, waterGoal - activeDayWater)} ml</strong></span>
            </div>
          </div>
        </GoalCard>
      </div>

      {/* Food Logger Accordion / Card */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-5 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FaUtensils className="text-green-400 w-5 h-5" />
            <div>
              <h3 className="text-lg font-bold text-white">Log Food to Meal</h3>
              <p className="text-xs text-white/60">
                Directly connected to your weekly diet for <span className="text-green-400 font-semibold">{activeDay.name}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600/30 hover:bg-green-600/50 text-green-300 border border-green-500/30 transition-colors"
          >
            <FaPlus className={`w-3 h-3 transition-transform ${isFormOpen ? "rotate-45" : ""}`} />
            <span>{isFormOpen ? "Close Logger" : "Quick Add Food"}</span>
          </button>
        </div>

        {isFormOpen && (
          <form onSubmit={handleAddProduct} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Target Meal Selector */}
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Target Meal
                </label>
                <select
                  value={selectedMealId}
                  onChange={(e) => setSelectedMealId(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {activeDay.meals.map((meal) => (
                    <option key={meal.id} value={meal.id} className="bg-neutral-900 text-white">
                      {meal.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Food Name / Search */}
              <div className="relative sm:col-span-2">
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Food Name or Search Product
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={foodName}
                    onChange={handleSearchChange}
                    placeholder="e.g. Oatmeal, Chicken breast, Banana..."
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-white/40"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-2.5 text-xs text-white/60 animate-pulse">
                      Searching...
                    </div>
                  )}
                </div>

                {/* OpenFoodFacts Autocomplete Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-neutral-900/95 border border-white/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
                    <div className="text-[11px] text-white/50 px-3 py-1 border-b border-white/10 bg-white/5">
                      Suggestions from OpenFoodFacts:
                    </div>
                    {searchResults.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectProduct(option)}
                        className="w-full text-left px-3 py-2 text-xs text-white hover:bg-green-600/30 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between"
                      >
                        <span className="font-medium truncate">{option.label}</span>
                        <FaSearch className="w-2.5 h-2.5 text-white/40 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nutrients & Portion Inputs (With zero-tolerant inputs) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1">Weight (g)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={weightInGrams}
                  onChange={handleWeightChange}
                  placeholder="100"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 font-medium mb-1">Calories (kcal)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-green-400 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 font-medium mb-1">Protein (g)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-blue-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 font-medium mb-1">Carbs (g)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-yellow-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 font-medium mb-1">Fat (g)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-red-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                />
              </div>
            </div>

            {isLoadingNutrients && (
              <div className="text-xs text-green-400 font-medium animate-pulse text-center">
                Calculating nutritional values for portion...
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FaPlus className="w-3 h-3" />
                <span>Add to {activeDay.meals.find((m) => m.id === selectedMealId)?.name}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Today's Meals Breakdown */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{activeDay.name}&apos;s Meals Breakdown</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                {activeDayCalories} kcal total
              </span>
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Foods and products recorded in your diet plan
            </p>
          </div>
          <Link
            href="/calories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-green-400 hover:text-green-300 transition-colors self-start sm:self-auto"
          >
            <span>Open Full Weekly Planner</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDay.meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all hover:bg-white/[0.08]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-white text-base">{meal.name}</span>
                  <span className="text-xs font-semibold text-green-400 bg-white/10 px-2 py-0.5 rounded-full">
                    {meal.calories} kcal
                  </span>
                </div>

                <div className="mt-2.5 space-y-2">
                  {meal.products.length === 0 ? (
                    <p className="text-xs text-white/40 italic py-2 text-center">
                      No foods logged for {meal.name} yet.
                    </p>
                  ) : (
                    meal.products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-black/20 border border-white/5 rounded-lg px-2.5 py-2 text-xs text-white/90 gap-2"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{p.name}</p>
                          <p className="text-[11px] text-white/60">
                            {p.weightInGrams}g • <span className="text-green-400 font-medium">{p.calories} kcal</span>
                            {p.protein !== "0" && ` • P: ${p.protein}g`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteProductFromMeal(activeDayId, meal.id, p.id)}
                          className="text-white/40 hover:text-red-400 p-1 rounded transition-colors shrink-0"
                          title="Remove food"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openFormForMeal(meal.id)}
                className="w-full py-1.5 px-3 bg-white/5 hover:bg-green-600/30 text-white/80 hover:text-green-200 border border-white/10 hover:border-green-500/40 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <FaPlus className="w-2.5 h-2.5" />
                <span>Add to {meal.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
