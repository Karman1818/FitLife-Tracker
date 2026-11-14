"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUtensils,
  FaGlobeAmericas,
  FaYoutube,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaBookOpen,
  FaListUl,
} from "react-icons/fa";
import Button from "@/components/averi-ui/button";
import { formatRecipeSteps } from "@/lib/recipe";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  strTags?: string;
  [key: string]: string | undefined;
}

interface IngredientItem {
  ingredient: string;
  measure: string;
}

export default function Page() {
  const [mealData, setMealData] = useState<Meal[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("mealData");
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setMealData(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (e) {
          console.error("Error parsing meal data from localStorage:", e);
        }
      }
    }
  }, []);

  const meal = mealData[0];

  // Extract ingredients and measurements
  const getIngredients = (m: Meal): IngredientItem[] => {
    const list: IngredientItem[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = m[`strIngredient${i}`];
      const measure = m[`strMeasure${i}`];
      if (ingredient && typeof ingredient === "string" && ingredient.trim().length > 0) {
        list.push({
          ingredient: ingredient.trim(),
          measure: measure && typeof measure === "string" ? measure.trim() : "",
        });
      }
    }
    return list;
  };

  if (!meal) {
    return (
      <div className="py-16 px-4 max-w-2xl mx-auto text-center space-y-4">
        <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-8 backdrop-blur-md space-y-4">
          <FaBookOpen className="w-12 h-12 text-white/50 mx-auto" />
          <h2 className="text-2xl font-bold text-white">No recipe selected</h2>
          <p className="text-white/70 text-sm">
            Please choose a recipe from the meals catalog to view details.
          </p>
          <Button onClick={() => router.push("/meals")}>Go to Meals Catalog</Button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const steps = formatRecipeSteps(meal.strInstructions);
  const tags = meal.strTags ? meal.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium backdrop-blur-md transition-all shadow-md hover:scale-[1.02]"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Meals</span>
        </button>
      </div>

      {/* Hero Recipe Card */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Recipe Image */}
          <div className="md:col-span-5 w-full">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={600}
                height={600}
                priority
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Recipe Metadata & Header */}
          <div className="md:col-span-7 space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {meal.strCategory && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                  <FaUtensils className="w-3 h-3" />
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <FaGlobeAmericas className="w-3 h-3" />
                  {meal.strArea} Cuisine
                </span>
              )}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/15"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {meal.strMeal}
            </h1>

            {/* Summary Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                  Ingredients
                </div>
                <div className="text-2xl font-bold text-green-400 mt-0.5">
                  {ingredients.length}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                  Cooking Steps
                </div>
                <div className="text-2xl font-bold text-blue-400 mt-0.5">
                  {steps.length}
                </div>
              </div>
            </div>

            {/* External Links / Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {meal.strYoutube && (
                <Link
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold shadow-md transition-all hover:scale-[1.02]"
                >
                  <FaYoutube className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </Link>
              )}
              {meal.strSource && (
                <Link
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold transition-all hover:scale-[1.02]"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  <span>Original Source</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Ingredients & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ingredients Checklist */}
        <div className="lg:col-span-4 bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <FaListUl className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold text-white">Ingredients</h2>
          </div>

          <div className="space-y-2">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                <div className="flex items-center gap-2.5 text-sm text-white/90">
                  <FaCheckCircle className="w-3.5 h-3.5 text-green-400/80 shrink-0" />
                  <span className="font-medium">{item.ingredient}</span>
                </div>
                {item.measure && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-white/75 shrink-0 ml-2">
                    {item.measure}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="lg:col-span-8 bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <FaBookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Preparation Steps</h2>
          </div>

          <div className="space-y-4">
            {steps.map((stepText, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-white font-bold text-sm shrink-0 shadow-md">
                  {idx + 1}
                </div>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed self-center">
                  {stepText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
