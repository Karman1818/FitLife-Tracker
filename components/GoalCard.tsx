"use client";

import React, { useState, useEffect } from "react";
import PieChartComponent from "@/components/PieChartOutline";

interface Props {
  title: string;
  percentage: number;
  goal: number;
  setGoal: (value: number) => void;
  unit: string;
  value: number;
  remainingValue: number;
  children?: React.ReactNode;
}

export default function GoalCard({
  title,
  percentage,
  goal,
  setGoal,
  unit,
  value,
  remainingValue,
  children,
}: Props) {
  const id = "goal-card-" + title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const [inputValue, setInputValue] = useState<string>(String(goal));

  useEffect(() => {
    setInputValue(String(goal));
  }, [goal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setGoal(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setInputValue(String(goal));
      setGoal(goal);
    }
  };

  return (
    <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-5 backdrop-blur-md flex flex-col items-center justify-between transition-all hover:bg-white/[0.12]">
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-2 mb-3">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">{title}</h3>
        <span className="text-xs text-white/60 font-medium bg-white/10 px-2 py-0.5 rounded-full">
          Target: {goal} {unit}
        </span>
      </div>

      <div className="my-2 flex justify-center">
        <PieChartComponent
          percentage={percentage}
          size={190}
          value={value}
          unit={unit}
          remainingValue={remainingValue}
        />
      </div>

      <div className="w-full mt-3 pt-3 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-white/80">
          <label htmlFor={id} className="font-medium text-xs sm:text-sm">
            Set daily {unit} goal:
          </label>
          <div className="relative flex items-center">
            <input
              id={id}
              type="number"
              min="1"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g. 2000"
              className="bg-white/10 border border-white/20 rounded-lg py-1 px-2 text-white text-center font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="ml-1 text-xs text-white/60 font-medium">{unit}</span>
          </div>
        </div>

        {children && <div className="w-full">{children}</div>}
      </div>
    </div>
  );
}
