import { useState } from "react";
import "../styles/BMI.css";

const BMI = () => {
  const [weight, setWeight] = useState(""); // Waga w kg
  const [height, setHeight] = useState(""); // Wzrost w cm
  const [bmiResult, setBmiResult] = useState(""); // Wynik BMI
  const [bmiCategory, setBmiCategory] = useState(""); // Kategoria wagi

  // Funkcja obliczająca BMI
  const calculateBMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Zapobiega odświeżeniu strony

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Jeśli jedna z wartości jest pusta, wyświetlamy alert
    if (!weightValue || !heightValue) {
      alert("Podaj poprawne wartości dla wagi i wzrostu!");
      return;
    }

    // Obliczanie BMI: Waga (kg) / [Wzrost (m)]^2
    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);

    // Ustawienie wyniku BMI i kategorii
    setBmiResult(bmi.toFixed(1)); // Zaokrąglamy do 1 miejsca po przecinku
    determineBMICategory(bmi);
  };

  // Funkcja określająca kategorię BMI
  const determineBMICategory = (bmi: number) => {
    if (bmi < 18.5) {
      setBmiCategory("Niedowaga");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setBmiCategory("Waga prawidłowa");
    } else if (bmi >= 25 && bmi < 29.9) {
      setBmiCategory("Nadwaga");
    } else {
      setBmiCategory("Otyłość");
    }
  };

  return (
    <div className="bmi-container">
      <h1>Oblicz swoje BMI</h1>
      <form onSubmit={calculateBMI}>
        <div>
          <label>Waga (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Wzrost (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button type="submit">Oblicz BMI</button>
      </form>
      {bmiResult && (
        <div>
          <h2>Twoje BMI: {bmiResult}</h2>
          <p>Kategoria: {bmiCategory}</p>
        </div>
      )}
    </div>
  );
};

export default BMI;