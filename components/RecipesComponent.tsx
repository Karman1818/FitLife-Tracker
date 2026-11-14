"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUtensils, FaGlobeAmericas, FaArrowRight } from "react-icons/fa";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export default function RecipesComponent() {
  const router = useRouter();

  const [mealData, setMealData] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const URL = "https://www.themealdb.com/api/json/v1/1/random.php";

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data?.meals?.[0]) {
          setMealData([data.meals[0]]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading recipe:", error);
        setIsLoading(false);
      });
  }, []);

  const goToRecipes = (meals: Meal[]) => {
    localStorage.setItem("mealData", JSON.stringify(meals));
    router.push("/meals/recipes");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl min-h-[350px] animate-pulse">
        <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4" />
        <p className="text-white/60 text-sm">Loading delicious recipe...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-stretch">
      {mealData.map((data) => (
        <div
          key={data.idMeal}
          onClick={() => goToRecipes(mealData)}
          className="w-full flex flex-col justify-between bg-white/10 border-2 border-white/10 hover:border-white/30 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 cursor-pointer group"
        >
          {/* Recipe Thumbnail & Badges */}
          <div className="space-y-3">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg border border-white/10">
              <Image
                src={data.strMealThumb}
                alt={data.strMeal}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              {/* Floating badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {data.strCategory && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-green-300 border border-white/20">
                    <FaUtensils className="w-2.5 h-2.5" />
                    {data.strCategory}
                  </span>
                )}
                {data.strArea && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-blue-300 border border-white/20">
                    <FaGlobeAmericas className="w-2.5 h-2.5" />
                    {data.strArea}
                  </span>
                )}
              </div>
            </div>

            {/* Meal Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-300 transition-colors line-clamp-2">
              {data.strMeal}
            </h3>
          </div>

          {/* Action indicator */}
          <div className="pt-4 flex items-center justify-between text-sm text-white/70 group-hover:text-white border-t border-white/10 mt-3">
            <span className="font-medium">View Recipe</span>
            <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-green-400" />
          </div>
        </div>
      ))}
    </div>
  );
}
