"use client";

import RecipesComponent from "@/components/RecipesComponent";
import "@/styles/Profile.css";

export default function Page() {
  return (
    <div>
      <h1>Meals Recipes</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "170px" }}>
        <RecipesComponent/>
        <RecipesComponent/>
        <RecipesComponent/>
      </div>
      
      <button onClick={() => window.location.reload()}>reload</button>
    </div>
  );
};