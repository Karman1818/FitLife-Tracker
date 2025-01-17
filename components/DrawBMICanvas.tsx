import React, { useEffect, useRef } from "react";

interface Props {
  bmi: number | null;
  currentAngle: number;
  setCurrentAngle: React.Dispatch<React.SetStateAction<number>>;
}

export default function DrawBMICanvas({
  bmi,
  currentAngle,
  setCurrentAngle,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const drawColoredDiagram = (ctx: CanvasRenderingContext2D) => {
    const centerX = 200;
    const centerY = 200;
    const outerRadius = 158;
    const innerRadius = 110;
    
    const ranges = [
      { color: "#FF5722", start: 0, end: 10 },
      { color: "#FF9800", start: 10, end: 16 },
      { color: "#FFE400", start: 16, end: 17 },
      { color: "#D4E157", start: 17, end: 18.5 },
      { color: "#4CAF50", start: 18.5, end: 25 },
      { color: "#FF9800", start: 25, end: 30 },
      { color: "#FF5722", start: 30, end: 35 },
      { color: "#D20000", start: 35, end: 40 },
      { color: "#900000", start: 40, end: 50 },
    ];
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const anglePerBmi = Math.PI / 50;
    
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    ranges.forEach((range) => {
      const startAngle = anglePerBmi * range.start - Math.PI;
      const endAngle = anglePerBmi * range.end - Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = range.color;
      ctx.fill();
    });
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI, true);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  };
  
  const drawArrowWithAnimation = (
    ctx: CanvasRenderingContext2D,
    angle: number
  ) => {
    const centerX = 200;
    const centerY = 200;
    const arrowLength = 145; // Skrócona długość strzałki, tak aby nachodziła na kolorowe pola
    const arrowHeadLength = 20;
    
    const startX = centerX;
    const startY = centerY;
    
    // Końcowy punkt strzałki na zewnętrznej krawędzi
    const endX = startX + arrowLength * Math.cos(angle);
    const endY = startY + arrowLength * Math.sin(angle);
    
    // Rysowanie grotów strzałki (odwrócone o 180 stopni)
    const arrowAngle = Math.PI / 8;
    const arrowHeadLeftX =
      endX + arrowHeadLength * Math.cos(angle - arrowAngle);
    const arrowHeadLeftY =
      endY + arrowHeadLength * Math.sin(angle - arrowAngle);
    const arrowHeadRightX =
      endX + arrowHeadLength * Math.cos(angle + arrowAngle);
    const arrowHeadRightY =
      endY + arrowHeadLength * Math.sin(angle + arrowAngle);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Zaczynamy w środku diagramu
    ctx.lineTo(endX, endY); // Rysujemy trzon strzałki
    ctx.moveTo(endX, endY);
    ctx.lineTo(arrowHeadLeftX, arrowHeadLeftY);
    ctx.lineTo(arrowHeadRightX, arrowHeadRightY);
    ctx.closePath();
    ctx.fillStyle = "#666";
    ctx.fill();
  };
  
  useEffect(() => {
    const animateArrow = (
      ctx: CanvasRenderingContext2D,
      startAngle: number,
      targetAngle: number
    ) => {
      const step = (targetAngle - startAngle) / 50;
      let current = startAngle;
      
      const interval = setInterval(() => {
        current += step;
        if(
          (step > 0 && current >= targetAngle) ||
          (step < 0 && current <= targetAngle)
        ) {
          current = targetAngle;
          clearInterval(interval);
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawColoredDiagram(ctx);
        drawArrowWithAnimation(ctx, current);
        setCurrentAngle(current);
      }, 20);
    };
    
    const canvas = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext("2d");
      if(ctx) {
        drawColoredDiagram(ctx);
        if(bmi !== null) {
          const anglePerBmi = Math.PI / 50;
          const targetAngle =
            anglePerBmi * Math.min(50, Math.max(0, bmi)) - Math.PI;
          animateArrow(ctx, currentAngle, targetAngle);
        }
      }
    }
  }, [bmi, currentAngle, setCurrentAngle]);
  
  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} className="bmi-chart" width="400" height="200"/>
      {/* <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Kategoria BMI: {getBMICategory()}
      </p> */}
    </div>
  );
};