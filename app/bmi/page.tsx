"use client";

import { useEffect, useState } from "react";
import DrawBMICanvas from "@/components/DrawBMICanvas";
import Video from "@/components/Video";
import Button from "@/components/averi-ui/button";
import {
  calculateBmi,
  getBMICategory,
  getBMICategoryColor,
  isExtremeBMI,
} from "@/lib/bmi";

export default function Page() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(-Math.PI);
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [isShakeCompleted, setIsShakeCompleted] = useState(false);

  // Restore saved weight/height from localStorage on mount
  useEffect(() => {
    const storedWeight = localStorage.getItem("weight");
    const storedHeight = localStorage.getItem("height");
    if (storedWeight || storedHeight) {
      setFormData({
        weight: storedWeight || "",
        height: storedHeight || "",
      });
      if (storedWeight && storedHeight) {
        const w = parseFloat(storedWeight);
        const h = parseFloat(storedHeight);
        if (!isNaN(w) && !isNaN(h) && h > 0) {
          setBmi(calculateBmi(w, h));
        }
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    if (!isNaN(weight) && !isNaN(height) && height > 0) {
      const calculatedBmi = calculateBmi(weight, height);
      setBmi(calculatedBmi);

      // Save weight and height to localStorage
      localStorage.setItem("weight", formData.weight);
      localStorage.setItem("height", formData.height);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShakeEnd = () => {
    setIsShakeCompleted(true);
  };

  const weightProgress = Math.min(100, Math.max(0, (parseFloat(formData.weight || "0") / 200) * 100));
  const heightProgress = Math.min(100, Math.max(0, (parseFloat(formData.height || "0") / 250) * 100));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 border-2 border-white/5 shadow-2xl rounded-2xl p-8 backdrop-blur-md transition-all hover:bg-white/15">
          {isShakeCompleted && <Video />}

          <div
            className={`space-y-8 ${isExtremeBMI(bmi) ? "animate-shake" : ""}`}
            onAnimationEnd={handleShakeEnd}
          >
            <h1 className="text-3xl font-bold text-center text-white mb-8">
              Calculate your BMI
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                {/* Weight Input & Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="weight-number-input" className="text-white text-lg font-medium cursor-pointer">
                      Weight
                    </label>
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-1 shadow-inner focus-within:border-white/50 focus-within:bg-white/15 transition-all">
                      <input
                        id="weight-number-input"
                        type="number"
                        name="weight"
                        min="1"
                        max="300"
                        step="any"
                        placeholder="0"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-20 bg-transparent text-right text-white font-semibold text-lg focus:outline-none no-spinner"
                      />
                      <span className="text-white/60 ml-2 text-sm font-medium">kg</span>
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <input
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f50]"
                      id="weight-range"
                      type="range"
                      min="0"
                      max="200"
                      step="0.5"
                      name="weight"
                      value={formData.weight || 0}
                      onChange={handleInputChange}
                      style={{
                        background: `linear-gradient(to right, #f50 ${weightProgress}%, #374151 ${weightProgress}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1 px-1">
                      <span>0 kg</span>
                      <span>100 kg</span>
                      <span>200 kg</span>
                    </div>
                  </div>
                </div>

                {/* Height Input & Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="height-number-input" className="text-white text-lg font-medium cursor-pointer">
                      Height
                    </label>
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-1 shadow-inner focus-within:border-white/50 focus-within:bg-white/15 transition-all">
                      <input
                        id="height-number-input"
                        type="number"
                        name="height"
                        min="1"
                        max="250"
                        step="any"
                        placeholder="0"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-20 bg-transparent text-right text-white font-semibold text-lg focus:outline-none no-spinner"
                      />
                      <span className="text-white/60 ml-2 text-sm font-medium">cm</span>
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <input
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f50]"
                      id="height-range"
                      type="range"
                      min="0"
                      max="250"
                      step="1"
                      name="height"
                      value={formData.height || 0}
                      onChange={handleInputChange}
                      style={{
                        background: `linear-gradient(to right, #f50 ${heightProgress}%, #374151 ${heightProgress}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1 px-1">
                      <span>0 cm</span>
                      <span>125 cm</span>
                      <span>250 cm</span>
                    </div>
                  </div>
                </div>
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
                    BMI: <span style={{ color: getBMICategoryColor(bmi) }}>{bmi.toFixed(2)}</span>
                  </h2>
                  <p className="text-xl text-white/80">{getBMICategory(bmi)}</p>
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
}
