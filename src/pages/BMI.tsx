import React, { useEffect, useRef, useState } from "react";
import HeaderNav from "../components/HeaderNav";
import FooterNav from "../components/FooterNav";
import "../styles/BMI.css";

const BMIChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(-Math.PI); // Start od lewej strony (-90°)
  const [formData, setFormData] = useState({ weight: "", height: "" });

  const calculateBmi = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2); // Wzrost w cm
  };

  const drawColoredDiagram = (ctx: CanvasRenderingContext2D) => {
    const centerX = 200;
    const centerY = 200;
    const outerRadius = 158; // Zwiększenie zewnętrznego promienia o 8 (158 zamiast 150)
    const innerRadius = 110; // Wewnętrzny promień pozostaje bez zmian

    // Przedziały BMI i kolory
    const ranges = [
      { color: "#FFE400", start: 0, end: 16 }, // Mocna niedowaga
      { color: "#D4E157", start: 16, end: 18.4 }, // Lekka niedowaga
      { color: "#4CAF50", start: 18.5, end: 24.9 }, // Prawidłowa waga
      { color: "#FF9800", start: 25, end: 29.9 }, // Nadwaga
      { color: "#FF5722", start: 30, end: 34.9 }, // Otyłość I
      { color: "#D20000", start: 35, end: 39.9 }, // Otyłość II
      { color: "#900000", start: 40, end: 50 }, // Otyłość III
    ];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const anglePerBmi = Math.PI / 50; // Skala BMI 0-50 na półkole (180°)

    // Ustawienie lini, by nie były widoczne przerwy
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ranges.forEach((range) => {
      const startAngle = anglePerBmi * range.start - Math.PI; // Obrót o -90°
      const endAngle = anglePerBmi * range.end - Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = range.color;
      ctx.fill();
    });

    // Biały środek półkola
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI, true);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  };

  const drawArrowWithAnimation = (
    ctx: CanvasRenderingContext2D,
    angle: number
  ) => {
    const centerX = 200; // Środek półkola
    const centerY = 200;
    const arrowWidth = 2;
    const arrowLength = 100; // Długość samej linii strzałki (wydłużona linia)

    const arrowHeadLength = 20; // Stała długość trójkąta (końcówka strzałki)

    // Początek strzałki - na dole białego półkola
    const startX = centerX;
    const startY = centerY; // Punkt początkowy na dole białego półkola

    // Obliczamy współrzędne końca strzałki, która wychodzi na zewnątrz półkola
    const endX = startX + arrowLength * Math.cos(angle);
    const endY = startY + arrowLength * Math.sin(angle);

    // Rysowanie linii strzałki
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Początek strzałki
    ctx.lineTo(endX, endY); // Koniec strzałki
    ctx.lineWidth = arrowWidth;
    ctx.strokeStyle = "#666";
    ctx.stroke();

    // Rysowanie końcówki strzałki (trójkąt)
    const arrowAngle = Math.PI / 8; // Kąt końcówki strzałki
    const arrowHeadLeftX =
      endX - arrowHeadLength * Math.cos(angle - arrowAngle);
    const arrowHeadLeftY =
      endY - arrowHeadLength * Math.sin(angle - arrowAngle);
    const arrowHeadRightX =
      endX - arrowHeadLength * Math.cos(angle + arrowAngle);
    const arrowHeadRightY =
      endY - arrowHeadLength * Math.sin(angle + arrowAngle);

    // Rysowanie trójkąta (końcówka strzałki)
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(arrowHeadLeftX, arrowHeadLeftY);
    ctx.lineTo(arrowHeadRightX, arrowHeadRightY);
    ctx.closePath();
    ctx.fillStyle = "#666";
    ctx.fill();

    // Dodanie kółka na przeciwnym końcu strzałki (anchor)
    const anchorRadius = 5; // Promień kółka
    ctx.beginPath();
    ctx.arc(startX, startY, anchorRadius, 0, 2 * Math.PI); // Kółko na końcu strzałki
    ctx.fillStyle = "#666"; // Kolor kółka
    ctx.fill();
  };

  const animateArrow = (
    ctx: CanvasRenderingContext2D,
    startAngle: number,
    targetAngle: number
  ) => {
    const step = (targetAngle - startAngle) / 50; // 50 kroków do osiągnięcia celu
    let current = startAngle;

    const interval = setInterval(() => {
      current += step;
      if (
        (step > 0 && current >= targetAngle) ||
        (step < 0 && current <= targetAngle)
      ) {
        current = targetAngle;
        clearInterval(interval);
      }
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawColoredDiagram(ctx);
      drawArrowWithAnimation(ctx, current);
      setCurrentAngle(current); // Aktualizacja bieżącego kąta
    }, 20); // Animacja co 20 ms
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawColoredDiagram(ctx);
        if (bmi !== null) {
          const anglePerBmi = Math.PI / 50; // Skala BMI 0-50 na półkole
          const targetAngle =
            anglePerBmi * Math.min(50, Math.max(0, bmi)) - Math.PI; // Obrót o -90°
          animateArrow(ctx, currentAngle, targetAngle);
        }
      }
    }
  }, [bmi]);

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

  return (
    <div>
      <div className="bmi-container">
        <form onSubmit={handleSubmit}>
          <label>
            Weight (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Height (cm):
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Calculate BMI</button>
        </form>
        <canvas
          ref={canvasRef}
          className="half-circle"
          width="400"
          height="200"
        />
        {bmi !== null && (
          <p className="bmi-result">Your BMI: {bmi.toFixed(2)}</p>
        )}
      </div>
      <HeaderNav />
      <FooterNav />
    </div>
  );
};

export default BMIChart;
