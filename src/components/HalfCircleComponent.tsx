import React from "react";
import "../styles/HalfCircleKPI.css";

interface HalfCircleKPIProps {
  bmi: number;
}

const HalfCircleKPI: React.FC<HalfCircleKPIProps> = ({ bmi }) => {
  const minBMI = 16;
  const maxBMI = 40;
  const angle = ((bmi - minBMI) / (maxBMI - minBMI)) * 180;

  const arrowStyle = {
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div className="half-circle-kpi">
      <svg viewBox="0 0 100 50" className="half-circle">
        <path
          d="M 10,50 A 40,40 0 0 1 90,50"
          fill="none"
          stroke="#ccc"
          strokeWidth="10"
        />
        <path
          d="M 10,50 A 40,40 0 0 1 90,50"
          fill="none"
          stroke="green"
          strokeWidth="10"
          strokeDasharray="50, 100"
        />
      </svg>
      <div className="arrow" style={arrowStyle}></div>
    </div>
  );
};

export default HalfCircleKPI;
