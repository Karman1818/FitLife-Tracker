import { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import FooterNav from "../components/FooterNav";
import "../styles/BMI.css";
import DrawBMICanvas from "../components/DrawBMICanvas";

const BMIChart = () => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(-Math.PI); // Start od lewej strony (-90°)
  const [formData, setFormData] = useState({ weight: "", height: "" });

  const calculateBmi = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2); // Wzrost w cm
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      const calculatedBmi = calculateBmi(weight, height);
      setBmi(calculatedBmi);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const weightRange = document.querySelector(
    "#weight-range"
  ) as HTMLInputElement | null;
  const weightValue = document.querySelector(".weight-value");

  const heightRange = document.querySelector(
    "#height-range"
  ) as HTMLInputElement | null;
  const heightValue = document.querySelector(".height-value");

  if (weightRange && weightValue) {
    weightRange.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const tempSliderValueW = target.value;
      weightValue.textContent = tempSliderValueW;

      const progress =
        (parseFloat(tempSliderValueW) / parseFloat(weightRange.max)) * 100;

      weightRange.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    });
  }

  if (heightRange && heightValue) {
    heightRange.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const tempSliderValueH = target.value;
      heightValue.textContent = tempSliderValueH;

      const progress =
        (parseFloat(tempSliderValueH) / parseFloat(heightRange.max)) * 100;

      heightRange.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    });
  }

  const getBMICategory = (): string => {
    if (bmi === null) return "Nieznana kategoria"; // jeśli bmi jest null

    if (bmi < 16) {
      return "Anoreksja";
    } else if (bmi >= 17 && bmi <= 18.4) {
      return "Niedowaga";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Waga normalna";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Nadwaga";
    } else if (bmi >= 30 && bmi <= 34.9) {
      return "Otyłość I stopnia";
    } else if (bmi >= 35 && bmi <= 39.9) {
      return "Otyłość II stopnia";
    } else {
      return "Otyłość III stopnia";
    }
  };

  return (
    <div>
      <div className="bmi-container">
      <h1 className="header">Calculate your BMI</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Weight (kg):
            <input
              className="rangeslider"
              id="weight-range"
              type="range"
              min="0"
              max="200"
              name="weight"
              value={formData.weight || 0}
              onChange={handleInputChange}
            />
            <div className="weight-value">0</div>
          </label>
          <label>
            Height (cm):
            <input
              className="rangeslider"
              id="height-range"
              type="range"
              min="0"
              max="250"
              name="height"
              value={formData.height || 0}
              onChange={handleInputChange}
            />
            <div className="height-value">0</div>
          </label>
          <br />
          <button className="calculate" type="submit">
            Calculate BMI
          </button>
        </form>
        <div className="bmi-chart-result">
          {bmi !== null && (
            <div>
              <h1 className="h1-bmi-result">
                BMI:
                <span>{bmi.toFixed(2)}</span>
              </h1>
              <p
                className="bmi-category"
                // style={{ marginTop: "20px", fontSize: "18px" }}
              >
                Kategoria BMI: {getBMICategory()}
              </p>
            </div>
          )}
          <DrawBMICanvas
            bmi={bmi}
            currentAngle={currentAngle}
            setCurrentAngle={setCurrentAngle}
          />
        </div>
      </div>
      <HeaderNav />
      <FooterNav />
    </div>
  );
};

export default BMIChart;
