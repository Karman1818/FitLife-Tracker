import { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import FooterNav from "../components/FooterNav";
import "../styles/BMI.css";
import DrawBMICanvas from "../components/DrawBMICanvas";
import Video from "../components/video";

const BMIChart = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(-Math.PI);
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [isShakeCompleted, setIsShakeCompleted] = useState(false); // Stan do kontrolowania zakończenia animacji

  // Add this function to determine if BMI is extreme
  const isExtremeBMI = (bmiValue: number | null): boolean => {
    if (bmiValue === null) return false;
    return bmiValue < 16 || bmiValue > 40;
  };

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
    } else if (bmi >= 16 && bmi < 18.5) {
      return "Niedowaga";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Waga normalna";
    } else if (bmi >= 25 && bmi < 30) {
      return "Nadwaga";
    } else if (bmi >= 30 && bmi < 35) {
      return "Otyłość I stopnia";
    } else if (bmi >= 35 && bmi < 40) {
      return "Otyłość II stopnia";
    } else {
      return "Otyłość III stopnia";
    }
  };

  const getBMICategoryColor = (): string => {
    if (bmi === null) return "black"; // Domyślny kolor, gdy BMI jest nieznane

    if (bmi < 10) {
      return "#FF5722"; // Anoreksja
    } else if (bmi >= 10 && bmi < 16) {
      return "#FF9800"; // Niedowaga
    } else if (bmi >= 16 && bmi <= 17) {
      return "#FFE400"; // Niedowaga
    } else if (bmi >= 17 && bmi < 18.5) {
      return "#D4E157"; // Niedowaga
    } else if (bmi >= 18.5 && bmi < 25) {
      return "#4CAF50"; // Waga normalna
    } else if (bmi >= 25 && bmi < 30) {
      return "#FF9800"; // Nadwaga
    } else if (bmi >= 30 && bmi < 35) {
      return "#FF5722"; // Otyłość I stopnia
    } else if (bmi >= 35 && bmi < 40) {
      return "#D20000"; // Otyłość II stopnia
    } else {
      return "#900000"; // Otyłość III stopnia
    }
  };

  // Funkcja, która zostanie wywołana po zakończeniu animacji "shake"
  const handleShakeEnd = () => {
    setIsShakeCompleted(true);
  };

  return (
    <div>
      {isShakeCompleted && <Video />}

      <div
        className={`bmi-container ${isExtremeBMI(bmi) ? "extreme-bmi" : ""}`}
        onAnimationEnd={handleShakeEnd} // Ustawienie funkcji, która reaguje na zakończenie animacji
      >
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
                <span style={{ color: getBMICategoryColor() }}>
                  {bmi.toFixed(2)}
                </span>{" "}
              </h1>
              <p className="bmi-category">{getBMICategory()}</p>
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
