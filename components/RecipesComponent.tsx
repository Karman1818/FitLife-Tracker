"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
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

  return (
    <div className="flex-1 flex items-center justify-center p-2">
      {isLoading ? (
        <div className="text-center py-8 text-white/60">Loading recipe...</div>
      ) : (
        mealData.map((data) => (
          <div className="text-center w-full" key={data.idMeal}>
            <div className="relative w-full max-w-[400px] mx-auto overflow-hidden rounded-xl shadow-lg border border-white/10 group cursor-pointer" onClick={() => goToRecipes(mealData)}>
              <Image
                src={data.strMealThumb}
                alt={data.strMeal}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p
              onClick={() => goToRecipes(mealData)}
              className="text-base font-medium mt-2 hover:underline cursor-pointer inline-block text-white/90"
            >
              {data.strMeal}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
