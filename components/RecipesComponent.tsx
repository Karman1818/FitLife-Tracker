"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
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
      setMealData([data.meals[0]]);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }, []);
  
  const goToRecipes = (mealData: Meal[]) => {
    localStorage.setItem("mealData", JSON.stringify(mealData)); // Zapisujemy dane w localStorage
    router.push("/meals/recipes");
  };
  
  
  return (
    <div className="flex items-center justify-center">
      {isLoading
        ? <p className="text-center">Loading...</p>
        : mealData.map((data) => (
          <div className="text-center" key={data.idMeal}>
            <Image
              style={{ borderRadius: "4px" }}
              src={data.strMealThumb}
              alt={data.strMeal}
              width={400}
              height={400}
              className="cursor-pointer"
              onClick={() => goToRecipes(mealData)}
            />
            <p className="text-sm hover:underline inline-block">{data.strMeal}</p>
          </div>
        ))}
    </div>
  );
};
