import { useState } from "react";
import "../styles/Home.css";
import AddProductForm from "../components/AddProductForm";
import PieChartComponent from "../components/PieChartOutline";
import AddedMealsList from "../components/AddedMealsList";

const Home = () => {
  const [goalCalories, setGoalCalories] = useState(2000); // Cel kalorii
  const [consumedCalories, setConsumedCalories] = useState(0); // Spożyte kalorie
  const [goalWater, setGoalWater] = useState(2500); // Cel wody w ml
  const [consumedWater, setConsumedWater] = useState(0); // Wypita woda w ml
  const [meals, setMeals] = useState([]); // Lista dodanych posiłków

  const caloriePercentage = Math.min((consumedCalories / goalCalories) * 100, 100);
  const waterPercentage = Math.min((consumedWater / goalWater) * 100, 100);

  // Obliczanie pozostałych kalorii i wody do zdobycia celu
  const remainingCalories = goalCalories - consumedCalories;
  const remainingWater = goalWater - consumedWater;

  const handleAddProduct = (product) => {
    // Aktualizacja kalorii i wody
    setConsumedCalories((prev) => prev + product.calories);
    setConsumedWater((prev) => prev + product.water);

    // Dodanie produktu do listy
    setMeals((prevMeals) => [...prevMeals, product]);
  };

  const GoalCard = ({ title, percentage, goal, setGoal, unit, value, remainingValue }) => (
    <div className="goal-card">
      <h3>{title}</h3>
      <PieChartComponent
        percentage={percentage}
        size={200}
        value={value}
        unit={unit}
        remainingValue={remainingValue} // Przekazanie pozostałej wartości
      />
      <div>
        <label>
          Cel {unit}:
          <input
            style={{ width: "50px" }}
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      <h1>Strona Główna</h1>

      <div className="goals-container">
        <GoalCard
          title="Spożyte Kalorie"
          percentage={caloriePercentage}
          goal={goalCalories}
          setGoal={setGoalCalories}
          unit="kcal"
          value={consumedCalories}
          remainingValue={remainingCalories} // Pozostała liczba kalorii
        />
        <GoalCard
          title="Spożyta Woda"
          percentage={waterPercentage}
          goal={goalWater}
          setGoal={setGoalWater}
          unit="ml"
          value={consumedWater}
          remainingValue={remainingWater} // Pozostała liczba ml wody
        />
      </div>

      <AddProductForm onAddProduct={handleAddProduct} />
      <AddedMealsList meals={meals} />
    </div>
  );
};

export default Home;
