"use client";

import { useEffect, useState } from "react";
import AddedMealsList from "@/components/AddedMealsList";


// TODO: Types
export default function Page() {
  const [meals/*, setMeals*/] = useState<Parameters<typeof AddedMealsList>[0]["meals"]>([]);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  
  // Odczytanie wagi i wzrostu z localStorage
  useEffect(() => {
    const storedWeight = localStorage.getItem("weight");
    const storedHeight = localStorage.getItem("height");
    
    if(storedWeight && storedHeight) {
      setWeight(storedWeight);
      setHeight(storedHeight);
    }
  }, []);
  
  
  return (
    <div>
      <AddedMealsList meals={meals}/>
      <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md">
        <h3 className="text-xl text-white">Your stats:</h3>
        <div>
          <p><strong>Waga:</strong> {weight ? `${weight} kg` : "Brak danych"}</p>
          <p><strong>Wzrost:</strong> {height ? `${height} cm` : "Brak danych"}</p>
        </div>
      </div>
    </div>
  );
}
