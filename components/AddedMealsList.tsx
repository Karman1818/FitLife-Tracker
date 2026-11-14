"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
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
  FaTimes,
  FaCheck,
  FaEdit,
} from "react-icons/fa";

interface Props {
  meals?: Meal[];
}

interface ProductResult {
  label: string;
  code: string;
  calories100g: number;
  protein100g: number;
  carbs100g: number;
  fat100g: number;
  brand?: string;
}

export default function AddedMealsList({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeDayId, setActiveDayId] = useState<number>(1);
  const [selectedMealId, setSelectedMealId] = useState<number>(1);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"custom" | "search">("custom");

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

  // Form State (Strings for zero-tolerant typing)
  const [foodName, setFoodName] = useState("");
  const [weightInGrams, setWeightInGrams] = useState("100");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  // Base nutritional values per 100g for automatic portion scaling
  const [basePer100g, setBasePer100g] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

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

  // Search in OpenFoodFacts
  const handlePerformSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchMessage("Please type at least 2 characters to search.");
      return;
    }

    try {
      setIsSearching(true);
      setSearchMessage(null);
      setSearchResults([]);

      // 1. Query internal API route proxy (CORS-safe, server-cached)
      const res = await fetch(`/api/food/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          setSearchResults(data.products);
          return;
        }
      }

      // 2. Direct fallback without custom forbidden headers if proxy isn't reached
      const directRes = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&action=process&json=1&page_size=8`
      );
      const directData = await directRes.json();

      if (Array.isArray(directData.products) && directData.products.length > 0) {
        const results: ProductResult[] = directData.products
          .filter((p: { product_name?: string }) => Boolean(p.product_name))
          .slice(0, 6)
          .map((p: {
            product_name?: string;
            code?: string;
            id?: string;
            brands?: string;
            nutriments?: Record<string, number | string>;
          }) => {
            const kcal100g =
              p.nutriments?.["energy-kcal_100g"] ??
              p.nutriments?.["energy-kcal"] ??
              (p.nutriments?.energy
                ? Math.round(Number(p.nutriments.energy) / 4.184)
                : 0);

            return {
              label: p.product_name || "Unknown product",
              code: p.code || p.id || "",
              brand: p.brands || undefined,
              calories100g: Math.round(Number(kcal100g) || 0),
              protein100g: Number(Number(p.nutriments?.proteins_100g || 0).toFixed(1)),
              carbs100g: Number(Number(p.nutriments?.carbohydrates_100g || 0).toFixed(1)),
              fat100g: Number(Number(p.nutriments?.fat_100g || 0).toFixed(1)),
            };
          });

        if (results.length > 0) {
          setSearchResults(results);
          return;
        }
      }

      setSearchMessage("No matching food products found. You can enter values manually.");
    } catch (err) {
      console.error("OpenFoodFacts search error:", err);
      setSearchMessage("Search unavailable. Please enter food values manually.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (item: ProductResult) => {
    const gramNum = parseFloat(weightInGrams) || 100;
    const mult = gramNum / 100;

    setFoodName(item.brand ? `${item.label} (${item.brand})` : item.label);
    setBasePer100g({
      calories: item.calories100g,
      protein: item.protein100g,
      carbs: item.carbs100g,
      fat: item.fat100g,
    });

    setCalories(Math.round(item.calories100g * mult).toString());
    setProtein((item.protein100g * mult).toFixed(1));
    setCarbs((item.carbs100g * mult).toFixed(1));
    setFat((item.fat100g * mult).toFixed(1));

    // Switch back to custom view so the user can see and adjust values
    setActiveTab("custom");
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleWeightChange = (newWeightStr: string) => {
    const oldWeight = parseFloat(weightInGrams) || 100;
    setWeightInGrams(newWeightStr);
    const newWeight = parseFloat(newWeightStr);
    if (isNaN(newWeight) || newWeight <= 0) return;

    // Use current base per 100g or calculate it from existing input values
    let currentBase = basePer100g;
    if (!currentBase) {
      const curCal = parseFloat(calories);
      const curProt = parseFloat(protein);
      const curCarbs = parseFloat(carbs);
      const curFat = parseFloat(fat);
      if (!isNaN(curCal) || !isNaN(curProt) || !isNaN(curCarbs) || !isNaN(curFat)) {
        currentBase = {
          calories: !isNaN(curCal) && oldWeight > 0 ? (curCal / oldWeight) * 100 : 0,
          protein: !isNaN(curProt) && oldWeight > 0 ? (curProt / oldWeight) * 100 : 0,
          carbs: !isNaN(curCarbs) && oldWeight > 0 ? (curCarbs / oldWeight) * 100 : 0,
          fat: !isNaN(curFat) && oldWeight > 0 ? (curFat / oldWeight) * 100 : 0,
        };
        setBasePer100g(currentBase);
      }
    }

    if (currentBase) {
      const mult = newWeight / 100;
      setCalories(Math.round(currentBase.calories * mult).toString());
      setProtein((currentBase.protein * mult).toFixed(1));
      setCarbs((currentBase.carbs * mult).toFixed(1));
      setFat((currentBase.fat * mult).toFixed(1));
    }
  };

  const calcRatio = (rawStr: string, weight: number): number => {
    const val = parseFloat(rawStr);
    return !isNaN(val) && weight > 0 ? (val / weight) * 100 : 0;
  };

  const handleCaloriesChange = (val: string) => {
    setCalories(val);
    const w = parseFloat(weightInGrams) || 100;
    if (w > 0) {
      const num = parseFloat(val) || 0;
      setBasePer100g((prev) => ({
        calories: (num / w) * 100,
        protein: prev?.protein ?? calcRatio(protein, w),
        carbs: prev?.carbs ?? calcRatio(carbs, w),
        fat: prev?.fat ?? calcRatio(fat, w),
      }));
    }
  };

  const handleProteinChange = (val: string) => {
    setProtein(val);
    const w = parseFloat(weightInGrams) || 100;
    if (w > 0) {
      const num = parseFloat(val) || 0;
      setBasePer100g((prev) => ({
        calories: prev?.calories ?? calcRatio(calories, w),
        protein: (num / w) * 100,
        carbs: prev?.carbs ?? calcRatio(carbs, w),
        fat: prev?.fat ?? calcRatio(fat, w),
      }));
    }
  };

  const handleCarbsChange = (val: string) => {
    setCarbs(val);
    const w = parseFloat(weightInGrams) || 100;
    if (w > 0) {
      const num = parseFloat(val) || 0;
      setBasePer100g((prev) => ({
        calories: prev?.calories ?? calcRatio(calories, w),
        protein: prev?.protein ?? calcRatio(protein, w),
        carbs: (num / w) * 100,
        fat: prev?.fat ?? calcRatio(fat, w),
      }));
    }
  };

  const handleFatChange = (val: string) => {
    setFat(val);
    const w = parseFloat(weightInGrams) || 100;
    if (w > 0) {
      const num = parseFloat(val) || 0;
      setBasePer100g((prev) => ({
        calories: prev?.calories ?? calcRatio(calories, w),
        protein: prev?.protein ?? calcRatio(protein, w),
        carbs: prev?.carbs ?? calcRatio(carbs, w),
        fat: (num / w) * 100,
      }));
    }
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = foodName.trim();
    if (!trimmedName) {
      alert("Please enter a food name");
      return;
    }

    const parsedWeight = parseFloat(weightInGrams);
    const validWeight = !isNaN(parsedWeight) && parsedWeight > 0 ? parsedWeight : 100;

    const newProduct: Product = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: trimmedName,
      weightInGrams: validWeight,
      calories: calories || "0",
      protein: protein || "0",
      carbohydrates: carbs || "0",
      fat: fat || "0",
    };

    addProductToMeal(activeDayId, selectedMealId, newProduct);

    // Reset form for next entry
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setBasePer100g(null);
  };

  const openFormForMeal = (mealId: number) => {
    setSelectedMealId(mealId);
    setIsFormOpen(true);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isMounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-14 bg-white/10 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-64 bg-white/10 rounded-2xl" />
          <div className="h-64 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  const todayId = getCurrentDayId();
  const selectedMeal =
    activeDay.meals.find((m) => m.id === selectedMealId) || activeDay.meals[0];

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
            Current Day:{" "}
            <span className="font-semibold text-green-400">
              {days.find((d) => d.id === todayId)?.name}
            </span>
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
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                      title="Today"
                    />
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
            <span>
              Consumed: <strong className="text-white">{activeDayCalories} kcal</strong>
            </span>
            <span>
              Remaining:{" "}
              <strong className="text-green-400">
                {Math.max(0, calorieGoal - activeDayCalories)} kcal
              </strong>
            </span>
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
              <span>
                Drank: <strong className="text-blue-300">{activeDayWater} ml</strong>
              </span>
              <span>
                Remaining:{" "}
                <strong className="text-white">
                  {Math.max(0, waterGoal - activeDayWater)} ml
                </strong>
              </span>
            </div>
          </div>
        </GoalCard>
      </div>

      {/* Food Logger Card */}
      <div
        ref={formSectionRef}
        className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-5 backdrop-blur-md space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/20 text-green-400 rounded-xl">
              <FaUtensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Log Food to Meal</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 font-semibold">
                  {activeDay.name}
                </span>
              </h3>
              <p className="text-xs text-white/60">
                Enter your food and nutritional values directly into your daily diet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Tabs */}
            <div className="bg-black/30 p-1 rounded-xl flex items-center gap-1 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("custom")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "custom"
                    ? "bg-green-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <FaEdit className="w-3 h-3" />
                <span>Custom Entry</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("search")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "search"
                    ? "bg-green-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <FaSearch className="w-3 h-3" />
                <span>Search Online</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
              title={isFormOpen ? "Collapse Logger" : "Expand Logger"}
            >
              <FaTimes className={`w-3.5 h-3.5 transition-transform ${isFormOpen ? "" : "rotate-45"}`} />
            </button>
          </div>
        </div>

        {isFormOpen && (
          <div className="space-y-4">
            {/* Target Meal Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider whitespace-nowrap">
                Target Meal:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
                {activeDay.meals.map((meal) => {
                  const isSelected = meal.id === selectedMealId;
                  return (
                    <button
                      key={meal.id}
                      type="button"
                      onClick={() => setSelectedMealId(meal.id)}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all border text-center ${
                        isSelected
                          ? "bg-green-600 text-white border-green-400 shadow"
                          : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {meal.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB 1: Search Online (OpenFoodFacts) */}
            {activeTab === "search" && (
              <div className="space-y-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <form onSubmit={handlePerformSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search food database (e.g. Oats, Egg, Chicken, Banana)..."
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-white/40"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults([]);
                          setSearchMessage(null);
                        }}
                        className="absolute right-3 top-3 text-white/40 hover:text-white"
                      >
                        <FaTimes className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white text-sm font-bold rounded-xl shadow transition-all flex items-center gap-2 shrink-0"
                  >
                    <FaSearch className="w-3.5 h-3.5" />
                    <span>{isSearching ? "Searching..." : "Search"}</span>
                  </button>
                </form>

                {searchMessage && (
                  <p className="text-xs text-white/70 italic px-1">{searchMessage}</p>
                )}

                {searchResults.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-white/80">
                      Select a product to autofill macros:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                      {searchResults.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-black/30 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-green-500/50 transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{item.label}</p>
                            {item.brand && (
                              <p className="text-[11px] text-white/50 truncate">{item.brand}</p>
                            )}
                            <p className="text-[11px] text-green-400 font-semibold mt-0.5">
                              {item.calories100g} kcal / 100g
                              <span className="text-white/60 font-normal ml-1">
                                (P: {item.protein100g}g • C: {item.carbs100g}g • F: {item.fat100g}g)
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectSearchResult(item)}
                            className="px-3 py-1.5 bg-green-600/30 hover:bg-green-600 text-green-300 hover:text-white border border-green-500/40 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                          >
                            <FaCheck className="w-2.5 h-2.5" />
                            <span>Select</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Custom Entry Form (Always fully accessible with direct macro inputs) */}
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Food Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Food Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Apple, Chicken breast, Scrambled eggs..."
                    required
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-white/40"
                  />
                </div>

                {/* Portion Weight with Autoscaling & Quick Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      Portion Weight (g)
                    </label>
                    {basePer100g && (
                      <span className="text-[10px] text-green-400 font-bold px-1.5 py-0.5 bg-green-500/20 rounded">
                        ⚡ Autoscaling
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={weightInGrams}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    placeholder="100"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                  />
                  {/* Quick portion buttons */}
                  <div className="flex items-center justify-center gap-1 mt-2 flex-wrap">
                    {["50", "100", "150", "200", "250", "300"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleWeightChange(g)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                          weightInGrams === g
                            ? "bg-green-600 text-white border-green-400 shadow-sm"
                            : "bg-white/5 text-white/60 border-white/10 hover:bg-white/15 hover:text-white"
                        }`}
                      >
                        {g}g
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutritional Values & Macro Inputs - Always clearly displayed */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    Nutritional Values &amp; Macro Breakdown
                  </label>
                  <span className="text-[10px] text-white/50 italic">
                    {basePer100g ? "* Macros scale automatically with portion weight" : "* Enter macros directly or search database"}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Calories */}
                  <div className="bg-black/30 border border-green-500/30 rounded-xl p-3 space-y-1">
                    <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">
                      Calories (kcal)
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={calories}
                      onChange={(e) => handleCaloriesChange(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full bg-transparent border-b border-green-500/40 py-1 text-green-300 font-extrabold text-lg focus:outline-none focus:border-green-400 placeholder:text-green-500/30"
                    />
                  </div>

                  {/* Protein */}
                  <div className="bg-black/30 border border-blue-500/30 rounded-xl p-3 space-y-1">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                      Protein (g)
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={protein}
                      onChange={(e) => handleProteinChange(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-transparent border-b border-blue-500/40 py-1 text-blue-300 font-extrabold text-lg focus:outline-none focus:border-blue-400 placeholder:text-blue-500/30"
                    />
                  </div>

                  {/* Carbohydrates */}
                  <div className="bg-black/30 border border-yellow-500/30 rounded-xl p-3 space-y-1">
                    <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">
                      Carbs (g)
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={carbs}
                      onChange={(e) => handleCarbsChange(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-transparent border-b border-yellow-500/40 py-1 text-yellow-300 font-extrabold text-lg focus:outline-none focus:border-yellow-400 placeholder:text-yellow-500/30"
                    />
                  </div>

                  {/* Fat */}
                  <div className="bg-black/30 border border-red-500/30 rounded-xl p-3 space-y-1">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                      Fat (g)
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={fat}
                      onChange={(e) => handleFatChange(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full bg-transparent border-b border-red-500/40 py-1 text-red-300 font-extrabold text-lg focus:outline-none focus:border-red-400 placeholder:text-red-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-xs text-white/50">
                  Target: <strong className="text-white">{selectedMeal.name}</strong> on{" "}
                  <strong className="text-white">{activeDay.name}</strong>
                </p>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-extrabold rounded-xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <FaPlus className="w-3.5 h-3.5" />
                  <span>Add to {selectedMeal.name}</span>
                </button>
              </div>
            </form>
          </div>
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
                            {p.weightInGrams}g •{" "}
                            <span className="text-green-400 font-medium">{p.calories} kcal</span>
                            {p.protein !== "0" && ` • P: ${p.protein}g`}
                            {p.carbohydrates !== "0" && ` • C: ${p.carbohydrates}g`}
                            {p.fat !== "0" && ` • F: ${p.fat}g`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteProductFromMeal(activeDayId, meal.id, p.id)}
                          className="text-white/40 hover:text-red-400 p-1.5 rounded transition-colors shrink-0"
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
                className="w-full py-2 px-3 bg-white/5 hover:bg-green-600/30 text-white/80 hover:text-green-200 border border-white/10 hover:border-green-500/40 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
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
