"use client";

import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useCaloriesStore } from "@/stores/calories";
import AddProductToMealForm from "@/components/AddProductToMealForm";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaTrash,
  FaUtensils,
  FaFire,
  FaTimes,
  FaListUl,
} from "react-icons/fa";

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatDateToInput(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CaloriesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "all">("calendar");

  const days = useCaloriesStore((state) => state.days);
  const calorieGoal = useCaloriesStore((state) => state.calorieGoal);
  const deleteProductFromMeal = useCaloriesStore(
    (state) => state.deleteProductFromMeal
  );

  const [openMealForms, setOpenMealForms] = useState<{
    [dayId: number]: { [mealId: number]: boolean };
  }>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Map selected Date to dayId (1 = Monday, ..., 7 = Sunday)
  const currentDayId = useMemo(() => {
    const jsDay = selectedDate.getDay();
    return jsDay === 0 ? 7 : jsDay;
  }, [selectedDate]);

  // Generate the 7 days of the week containing selectedDate (Monday to Sunday)
  const weekDays = useMemo(() => {
    const ref = new Date(selectedDate);
    const day = ref.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(ref);
    monday.setDate(ref.getDate() + diffToMonday);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dDay = d.getDay();
      const id = dDay === 0 ? 7 : dDay;
      return {
        id,
        date: d,
        dateNumber: d.getDate(),
        monthShort: d.toLocaleString("en-US", { month: "short" }),
        weekdayShort: d.toLocaleString("en-US", { weekday: "short" }),
        weekdayFull: d.toLocaleString("en-US", { weekday: "long" }),
        isToday: isSameDay(d, new Date()),
        isSelected: isSameDay(d, selectedDate),
      };
    });
  }, [selectedDate]);

  const toggleMealForm = (dayId: number, mealId: number) => {
    setOpenMealForms((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [mealId]: !prev[dayId]?.[mealId],
      },
    }));
  };

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handlePrevWeek = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    setSelectedDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    setSelectedDate(next);
  };

  const handleDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split("-").map(Number);
    setSelectedDate(new Date(y, m - 1, d));
  };

  const handleGoToToday = () => {
    setSelectedDate(new Date());
  };

  const activeDay = days.find((d) => d.id === currentDayId) || days[0];

  // Nutritional totals for the active day
  const activeDayTotals = useMemo(() => {
    if (!activeDay) return { calories: 0, protein: "0.0", carbs: "0.0", fat: "0.0" };

    const calories = activeDay.meals.reduce((sum, m) => sum + m.calories, 0);
    const protein = activeDay.meals
      .reduce(
        (sum, m) =>
          sum + m.products.reduce((pSum, p) => pSum + (parseFloat(p.protein) || 0), 0),
        0
      )
      .toFixed(1);
    const carbs = activeDay.meals
      .reduce(
        (sum, m) =>
          sum +
          m.products.reduce((cSum, p) => cSum + (parseFloat(p.carbohydrates) || 0), 0),
        0
      )
      .toFixed(1);
    const fat = activeDay.meals
      .reduce(
        (sum, m) =>
          sum + m.products.reduce((fSum, p) => fSum + (parseFloat(p.fat) || 0), 0),
        0
      )
      .toFixed(1);

    return { calories, protein, carbs, fat };
  }, [activeDay]);

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-6 animate-pulse">
        <div className="h-20 bg-white/10 rounded-2xl" />
        <div className="h-64 bg-white/10 rounded-2xl" />
      </div>
    );
  }

  const calProgress =
    calorieGoal > 0
      ? Math.min(100, Math.round((activeDayTotals.calories / calorieGoal) * 100))
      : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Calendar Header & Navigator */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-5 backdrop-blur-md space-y-4">
        {/* Top Control Bar: Month, Navigation, Today, View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-500/20 text-green-400 rounded-xl">
              <FaCalendarAlt className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>
                  {selectedDate.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </h1>
              <p className="text-xs text-white/60">
                Pick a date from the calendar or navigate between days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Week navigation arrows */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
              <button
                type="button"
                onClick={handlePrevWeek}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Previous Week"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextWeek}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Next Week"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Jump to Today Button */}
            <button
              type="button"
              onClick={handleGoToToday}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors"
            >
              Today
            </button>

            {/* Native Date Picker Popover */}
            <div className="relative">
              <label
                htmlFor="calendar-date-input"
                className="cursor-pointer px-3.5 py-2 bg-green-600/30 hover:bg-green-600/50 text-green-300 border border-green-500/30 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <FaCalendarAlt className="w-3 h-3" />
                <span>Pick Date</span>
              </label>
              <input
                id="calendar-date-input"
                type="date"
                value={formatDateToInput(selectedDate)}
                onChange={handleDateInputChange}
                className="opacity-0 absolute -z-10 w-0 h-0"
              />
            </div>

            {/* View Mode Toggle: Day Calendar vs All Days */}
            <div className="bg-black/30 p-1 rounded-xl flex items-center gap-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  viewMode === "calendar"
                    ? "bg-green-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
                title="Focused day view with calendar navigation"
              >
                <FaCalendarAlt className="w-3 h-3" />
                <span>Day</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("all")}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  viewMode === "all"
                    ? "bg-green-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
                title="Overview of all days at once"
              >
                <FaListUl className="w-3 h-3" />
                <span>All Days</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7-Day Interactive Week Calendar Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {weekDays.map((item) => {
            const dayStore = days.find((d) => d.id === item.id);
            const totalKcal = dayStore
              ? dayStore.meals.reduce((sum, m) => sum + m.calories, 0)
              : 0;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-between p-3 rounded-xl transition-all border text-center ${
                  item.isSelected
                    ? "bg-green-600 border-green-400 text-white shadow-xl scale-[1.03] ring-2 ring-green-400/50"
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                  <span>{item.weekdayShort}</span>
                  {item.isToday && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                      title="Today"
                    />
                  )}
                </div>

                <div
                  className={`text-xl font-extrabold my-1 ${
                    item.isSelected ? "text-white" : "text-white/90"
                  }`}
                >
                  {item.dateNumber}
                </div>

                <div
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    item.isSelected
                      ? "bg-white/20 text-green-100"
                      : "bg-white/5 text-white/60"
                  }`}
                >
                  {totalKcal} kcal
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: Focused Calendar Day View (Default) */}
      {viewMode === "calendar" && (
        <div className="space-y-6">
          {/* Active Day Summary Banner */}
          <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  {isSameDay(selectedDate, new Date()) && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                      Today
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60 mt-1">
                  Daily nutritional budget &amp; meal log
                </p>
              </div>

              {/* Day Previous / Next Navigator */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="px-3 py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold text-white/90 transition-colors flex items-center gap-1.5"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  <span>Prev Day</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextDay}
                  className="px-3 py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold text-white/90 transition-colors flex items-center gap-1.5"
                >
                  <span>Next Day</span>
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Macros & Calorie Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Calories Metric */}
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                    <FaFire className="w-3.5 h-3.5" />
                    <span>Calories</span>
                  </span>
                  <span className="text-xs font-medium text-white/60">
                    Goal: {calorieGoal}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">
                    {activeDayTotals.calories}{" "}
                    <span className="text-xs font-semibold text-white/60">kcal</span>
                  </span>
                  <span className="text-xs font-bold text-green-400">
                    {calProgress}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-green-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${calProgress}%` }}
                  />
                </div>
              </div>

              {/* Protein Metric */}
              <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 flex flex-col justify-between space-y-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Protein
                </span>
                <span className="text-2xl font-black text-blue-300">
                  {activeDayTotals.protein} <span className="text-xs font-semibold">g</span>
                </span>
                <span className="text-[11px] text-white/50">Total consumed</span>
              </div>

              {/* Carbs Metric */}
              <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-4 flex flex-col justify-between space-y-1">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                  Carbohydrates
                </span>
                <span className="text-2xl font-black text-yellow-300">
                  {activeDayTotals.carbs} <span className="text-xs font-semibold">g</span>
                </span>
                <span className="text-[11px] text-white/50">Total consumed</span>
              </div>

              {/* Fat Metric */}
              <div className="bg-white/5 border border-red-500/30 rounded-xl p-4 flex flex-col justify-between space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Fat
                </span>
                <span className="text-2xl font-black text-red-300">
                  {activeDayTotals.fat} <span className="text-xs font-semibold">g</span>
                </span>
                <span className="text-[11px] text-white/50">Total consumed</span>
              </div>
            </div>
          </div>

          {/* Meals of the Selected Day */}
          <div className="space-y-4">
            {activeDay.meals.map((meal) => {
              const isFormOpen = Boolean(openMealForms[activeDay.id]?.[meal.id]);
              return (
                <div
                  key={meal.id}
                  className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-5 backdrop-blur-md space-y-4 transition-all"
                >
                  {/* Meal Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 text-white rounded-xl">
                        <FaUtensils className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <span>{meal.name}</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                            {meal.calories} kcal
                          </span>
                        </h3>
                        <p className="text-xs text-white/60">
                          {meal.products.length}{" "}
                          {meal.products.length === 1 ? "product" : "products"} logged
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleMealForm(activeDay.id, meal.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto ${
                        isFormOpen
                          ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                          : "bg-green-600 hover:bg-green-500 text-white shadow-md"
                      }`}
                    >
                      {isFormOpen ? (
                        <>
                          <FaTimes className="w-3 h-3" />
                          <span>Close Form</span>
                        </>
                      ) : (
                        <>
                          <FaPlus className="w-3 h-3" />
                          <span>Add Product to {meal.name}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Add Product Form Collapse */}
                  {isFormOpen && (
                    <div className="bg-black/30 border border-white/10 rounded-xl p-4 shadow-inner">
                      <AddProductToMealForm mealId={meal.id} dayId={activeDay.id} />
                    </div>
                  )}

                  {/* Meal Products Grid */}
                  {meal.products.length === 0 ? (
                    <div className="py-6 text-center text-white/50 text-xs italic bg-white/[0.02] border border-dashed border-white/10 rounded-xl">
                      No products added for {meal.name} yet. Click &quot;Add Product&quot; to log food.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {meal.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-all flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-white text-base truncate">
                                {product.name}
                              </h4>
                              <span className="text-xs font-extrabold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-md shrink-0">
                                {product.calories} kcal
                              </span>
                            </div>

                            <div className="mt-2 space-y-1 text-xs text-white/70">
                              <div className="flex justify-between py-0.5 border-b border-white/5">
                                <span>Weight:</span>
                                <span className="font-semibold text-white">
                                  {product.weightInGrams}g
                                </span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-white/5">
                                <span>Protein:</span>
                                <span className="font-semibold text-blue-300">
                                  {product.protein}g
                                </span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-white/5">
                                <span>Carbs:</span>
                                <span className="font-semibold text-yellow-300">
                                  {product.carbohydrates}g
                                </span>
                              </div>
                              <div className="flex justify-between py-0.5">
                                <span>Fat:</span>
                                <span className="font-semibold text-red-300">
                                  {product.fat}g
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              deleteProductFromMeal(activeDay.id, meal.id, product.id)
                            }
                            className="w-full py-1.5 px-3 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <FaTrash className="w-2.5 h-2.5" />
                            <span>Delete Product</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: All Days Overview (Legacy view, cleaned up) */}
      {viewMode === "all" && (
        <div className="space-y-6">
          {days.map((day) => {
            const dayTotal = day.meals.reduce((sum, m) => sum + m.calories, 0);
            return (
              <div
                key={day.id}
                className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-md space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-2xl font-extrabold text-white">{day.name}</h2>
                  <span className="text-sm font-bold text-green-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    {dayTotal} kcal total
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-bold text-white text-base">
                          {meal.name}
                        </span>
                        <span className="text-xs font-semibold text-green-400">
                          {meal.calories} kcal
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDate(
                            weekDays.find((w) => w.id === day.id)?.date || new Date()
                          );
                          setViewMode("calendar");
                          toggleMealForm(day.id, meal.id);
                        }}
                        className="w-full py-1.5 px-3 bg-green-600/30 hover:bg-green-600/50 text-green-200 border border-green-500/30 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <FaPlus className="w-2.5 h-2.5" />
                        <span>Manage / Add Products</span>
                      </button>

                      {meal.products.length === 0 ? (
                        <p className="text-xs text-white/40 italic text-center py-2">
                          No products
                        </p>
                      ) : (
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {meal.products.map((p) => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between bg-black/20 p-2 rounded-lg text-xs text-white/90"
                            >
                              <span className="truncate">{p.name}</span>
                              <span className="text-green-400 font-semibold shrink-0 ml-2">
                                {p.calories} kcal
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
