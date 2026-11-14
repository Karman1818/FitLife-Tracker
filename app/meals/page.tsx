"use client";

import { useState } from "react";
import RecipesComponent from "@/components/RecipesComponent";
import Button from "@/components/averi-ui/button";
import { FaSyncAlt } from "react-icons/fa";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-md text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Meal Recipes
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
          Discover healthy, balanced meal suggestions inspired by global cuisines. Click on any recipe to inspect full ingredients and cooking steps.
        </p>
      </div>

      {/* Recipe Cards Grid */}
      <div key={refreshKey} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecipesComponent />
        <RecipesComponent />
        <RecipesComponent />
      </div>

      {/* Action Reload */}
      <div className="flex justify-center pt-2">
        <Button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-6 py-2.5 text-base font-semibold text-white shadow-lg"
        >
          <FaSyncAlt className="w-4 h-4" />
          <span>Shuffle New Recipes</span>
        </Button>
      </div>
    </div>
  );
}
