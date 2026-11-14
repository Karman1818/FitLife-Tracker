"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddedMealsList from "@/components/AddedMealsList";
import { calculateBmi, getBMICategory, getBMICategoryColor } from "@/lib/bmi";
import { FaWeight, FaRulerVertical, FaCalculator, FaArrowRight } from "react-icons/fa";

export default function Page() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  useEffect(() => {
    const storedWeight = localStorage.getItem("weight");
    const storedHeight = localStorage.getItem("height");

    if (storedWeight) setWeight(storedWeight);
    if (storedHeight) setHeight(storedHeight);
  }, []);

  const numWeight = parseFloat(weight);
  const numHeight = parseFloat(height);
  const hasStats = !isNaN(numWeight) && !isNaN(numHeight) && numWeight > 0 && numHeight > 0;
  const bmiScore = hasStats ? calculateBmi(numWeight, numHeight) : null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Daily Nutrition & Goals Tracker */}
      <AddedMealsList />

      {/* User Stats Card */}
      <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Personal Health Metrics</span>
          </h3>
          <Link
            href="/bmi"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            <span>{hasStats ? "Recalculate BMI" : "Set Metrics"}</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {hasStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                <FaWeight className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Weight</p>
                <p className="text-xl font-bold text-white">{weight} kg</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                <FaRulerVertical className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Height</p>
                <p className="text-xl font-bold text-white">{height} cm</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                <FaCalculator className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">BMI Index</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white" style={{ color: getBMICategoryColor(bmiScore) }}>
                    {bmiScore}
                  </span>
                  <span className="text-xs font-medium text-white/75">
                    ({getBMICategory(bmiScore)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-center sm:text-left">
            <div>
              <p className="text-white font-medium text-base">No health metrics saved yet</p>
              <p className="text-white/60 text-sm">
                Enter your weight and height in the interactive BMI calculator to see your stats here.
              </p>
            </div>
            <Link
              href="/bmi"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shrink-0"
            >
              Open BMI Calculator
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
