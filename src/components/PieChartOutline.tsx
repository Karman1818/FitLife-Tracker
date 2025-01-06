import React from "react";
import "../styles/PieChartOutline.css";

interface PieChartOutlineProps {
  percentage: number; // Procentowy zakres od 0 do 100
  size: number; // Rozmiar kontenera
}

const PieChartComponent: React.FC<PieChartOutlineProps> = ({ percentage, size }) => {
  const radius = size / 2; // Średnica
  const innerCircleRadius = radius - 8; // Mniejsze kolo z marginesem 8px

  return (
    <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative' }}>
      {/* Główne koło z wypełnieniem */}
      <div
        className="pie"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundImage: `conic-gradient(yellowgreen 0% ${percentage}%, transparent ${percentage}% 100%)`,
          position: "relative",
          transition: "background-image 0.5s ease-in-out", // Płynne przejście w CSS
        }}
      >
        {/* Czarne wewnętrzne koło */}
        <div
          className="inner-circle"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${innerCircleRadius * 2}px`,
            height: `${innerCircleRadius * 2}px`,
            borderRadius: "50%",
            background: "rgb(36, 36, 36)",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PieChartComponent;
