"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const RecipesComponent = () => {
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
  
  const goToRecipes = () => {
    router.push("/meals/recipes");
  };
  
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {mealData.map((data) => (
            <div onClick={goToRecipes} key={data.idMeal} style={{ textAlign: "center" }}>
              <Image
                style={{ borderRadius: "4px" }}
                src={data.strMealThumb}
                alt={data.strMeal}
                width={400}
              />
              <p style={{ fontSize: "14px" }}>{data.strMeal}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
