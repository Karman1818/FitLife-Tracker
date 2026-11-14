import React from "react";

interface Props {
  percentage: number;
  size: number;
  value: number;
  unit: string;
  remainingValue: number;
}

export default function PieChartComponent({ percentage, size, value, unit, remainingValue }: Props) {
  const radius = size / 2;
  const innerCircleRadius = radius - 8;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div style={{ width: `${size}px`, height: `${size}px`, position: "relative" }}>
      {/* Outer circle with gradient border */}
      <div
        className="pie"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundImage: `conic-gradient(#22c55e 0% ${clampedPercentage}%, rgba(255, 255, 255, 0.1) ${clampedPercentage}% 100%)`,
          position: "relative",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        {/* Dark inner circle */}
        <div
          className="inner-circle"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${innerCircleRadius * 2}px`,
            height: `${innerCircleRadius * 2}px`,
            borderRadius: "50%",
            background: "rgba(24, 27, 33, 0.95)",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "8px",
          }}
        >
          <div className="text-2xl font-extrabold text-green-400">
            {value} <span className="text-sm font-semibold">{unit}</span>
          </div>
          <div className="text-xs text-white/70 font-medium mt-1">
            {remainingValue > 0 ? `${remainingValue} ${unit} left` : "Goal reached! 🎉"}
          </div>
          <div className="text-[11px] text-white/50 font-medium mt-0.5">
            {Math.round(clampedPercentage)}% of goal
          </div>
        </div>
      </div>
    </div>
  );
}
