"use client";

import { useState} from "react";
import DrawBMICanvas from "@/components/DrawBMICanvas";
import Video from "@/components/Video";
import Button from "@/components/averi-ui/button";

export default function Page() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(-Math.PI);
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [isShakeCompleted, setIsShakeCompleted] = useState(false); // State to control animation completion
  
  const isExtremeBMI = (bmiValue: number | null): boolean => {
    if(bmiValue === null) return false;
    return bmiValue < 16 || bmiValue > 40;
  };

  const calculateBmi = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2); // Height in cm
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    if(!isNaN(weight) && !isNaN(height) && height > 0) {
      const calculatedBmi = calculateBmi(weight, height);
      setBmi(calculatedBmi);
      
      // Save weight and height to localStorage
      localStorage.setItem('weight', formData.weight);
      localStorage.setItem('height', formData.height);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const weightRange = document.querySelector("#weight-range") as HTMLInputElement | null;
  const weightValue = document.querySelector(".weight-value");
  const heightRange = document.querySelector("#height-range") as HTMLInputElement | null;
  const heightValue = document.querySelector(".height-value");

  if(weightRange && weightValue) {
    weightRange.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const tempSliderValueW = target.value;
      weightValue.textContent = tempSliderValueW;
      const progress = (parseFloat(tempSliderValueW) / parseFloat(weightRange.max)) * 100;
      weightRange.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    });
  }

  if(heightRange && heightValue) {
    heightRange.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      const tempSliderValueH = target.value;
      heightValue.textContent = tempSliderValueH;
      const progress = (parseFloat(tempSliderValueH) / parseFloat(heightRange.max)) * 100;
      heightRange.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    });
  }

  const getBMICategory = (): string => {
    if(bmi === null) return "Unknown category";
    
    if(bmi < 16) {
      return "Severe Underweight";
    } else if(bmi >= 16 && bmi < 18.5) {
      return "Underweight";
    } else if(bmi >= 18.5 && bmi < 25) {
      return "Normal Weight";
    } else if(bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else if(bmi >= 30 && bmi < 35) {
      return "Obesity Class I";
    } else if(bmi >= 35 && bmi < 40) {
      return "Obesity Class II";
    } else {
      return "Obesity Class III";
    }
  };

  const getBMICategoryColor = (): string => {
    if(bmi === null) return "black";
    
    if(bmi < 10) {
      return "#FF5722"; // Severe Underweight
    } else if(bmi >= 10 && bmi < 16) {
      return "#FF9800"; // Underweight
    } else if(bmi >= 16 && bmi <= 17) {
      return "#FFE400"; // Mild Underweight
    } else if(bmi >= 17 && bmi < 18.5) {
      return "#D4E157"; // Slight Underweight
    } else if(bmi >= 18.5 && bmi < 25) {
      return "#4CAF50"; // Normal
    } else if(bmi >= 25 && bmi < 30) {
      return "#FF9800"; // Overweight
    } else if(bmi >= 30 && bmi < 35) {
      return "#FF5722"; // Obesity I
    } else if(bmi >= 35 && bmi < 40) {
      return "#D20000"; // Obesity II
    } else {
      return "#900000"; // Obesity III
    }
  };

  const handleShakeEnd = () => {
    setIsShakeCompleted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div
          className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-8 backdrop-blur-md transition-all hover:bg-white/15">
          {isShakeCompleted && <Video/>}

          <div
            className={`space-y-8 ${isExtremeBMI(bmi) ? "animate-shake" : ""}`}
            onAnimationEnd={handleShakeEnd}
          >
            <h1 className="text-3xl font-bold text-center text-white mb-8">
              Calculate your BMI
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-white text-lg mb-2 block">Weight (kg)</span>
                  <div className="relative">
                    <input
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      id="weight-range"
                      type="range"
                      min="0"
                      max="200"
                      name="weight"
                      value={formData.weight || 0}
                      onChange={handleInputChange}
                    />
                    <div className="weight-value text-white text-center mt-2">0</div>
                  </div>
                </label>

                <label className="block">
                  <span className="text-white text-lg mb-2 block">Height (cm)</span>
                  <div className="relative">
                    <input
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      id="height-range"
                      type="range"
                      min="0"
                      max="250"
                      name="height"
                      value={formData.height || 0}
                      onChange={handleInputChange}
                    />
                    <div className="height-value text-white text-center mt-2">0</div>
                  </div>
                </label>
              </div>

              <Button
                className="w-full px-6 text-white font-medium text-lg h-10"
                type="submit"
              >
                Calculate BMI
              </Button>
            </form>

            <div className="mt-8">
              {bmi !== null && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white">
                    BMI: <span style={{ color: getBMICategoryColor() }}>{bmi.toFixed(2)}</span>
                  </h2>
                  <p className="text-xl text-white/80">{getBMICategory()}</p>
                </div>
              )}

              <div className="mt-8">
                <DrawBMICanvas
                  bmi={bmi}
                  currentAngle={currentAngle}
                  setCurrentAngle={setCurrentAngle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
