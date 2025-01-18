"use client";

import RecipesComponent from "@/components/RecipesComponent";
import Button from "@/components/averi-ui/button";

export default function Page() {
  return (
    <div className="p-1.5 space-y-1.5 bg-white/10 border-2 border-white/5 shadow-lg m-1 rounded-lg backdrop-blur-md m-1.5">
      <h1 className="text-2xl text-center">Meals Recipes</h1>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2">
        <RecipesComponent/>
        <RecipesComponent/>
        <RecipesComponent/>
      </div>
      
      <div className="w-full flex items-center justify-center">
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    </div>
  );
};