import { useState } from "react";
import "../styles/Home.css";
import AddProductForm from "../components/AddProductForm";
import PieChartComponent from "../components/PieChartOutline";

const Home = () => {
  const [goalCalories, setGoalCalories] = useState(640); // Cel kalorii
  const [consumedCalories, setConsumedCalories] = useState(0); // Spożyte kalorie

  // Obliczamy procent spożycia kalorii w stosunku do celu
  const percentage = Math.min((consumedCalories / goalCalories) * 100, 100);

  return (
    <div className="home-container">
      <h1>Strona Główna</h1>
      <p>Witaj w aplikacji do mierzenia kalorii z posiłków!</p>

      {/* Pie Chart Component */}
      <div
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChartComponent percentage={percentage} size={300} />
      </div>

      {/* Form to add products */}
      <AddProductForm onCaloriesChange={setConsumedCalories} />

      <div>
        <label>
          Cel kalorii:
          <input
            type="number"
            value={goalCalories}
            onChange={(e) => setGoalCalories(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default Home;
