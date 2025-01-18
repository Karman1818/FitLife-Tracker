"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

export default function Page() {
  const [mealData, setMealData] = useState<Meal[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    if(typeof window !== "undefined") {  // Sprawdź, czy kod jest uruchamiany po stronie klienta
      const storedData = localStorage.getItem("mealData");
      if(storedData) {
        setMealData(JSON.parse(storedData));
      }
    }
  }, []);
  
  return (
    <>
      {mealData.length > 0 ? (
        mealData.map((meal) => (
          <div key={meal.idMeal} style={{ textAlign: "center" }}>
            <h1>{meal.strMeal}</h1>
            <p>{meal.strInstructions}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => router.back()}>Go Back</button>
    </>
  );
}
