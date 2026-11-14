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
  const currentAngleRef = useRef<number>(currentAngle);

  // Keep ref synchronized
  useEffect(() => {
    currentAngleRef.current = currentAngle;
  }, [currentAngle]);

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

    // Inner dial background
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI, true);
    ctx.fillStyle = "#1e293b";
    ctx.fill();
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, angle: number) => {
    const centerX = 200;
    const centerY = 200;
    const arrowLength = 142;

    const endX = centerX + arrowLength * Math.cos(angle);
    const endY = centerY + arrowLength * Math.sin(angle);

    // Shaft of needle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#ffffff";
    ctx.lineCap = "round";
    ctx.stroke();

    // Center pivot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Arrowhead pointing outwards
    const headLength = 16;
    const headAngle = Math.PI / 7;
    const leftX = endX - headLength * Math.cos(angle - headAngle);
    const leftY = endY - headLength * Math.sin(angle - headAngle);
    const rightX = endX - headLength * Math.cos(angle + headAngle);
    const rightY = endY - headLength * Math.sin(angle + headAngle);

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (bmi === null) {
      drawColoredDiagram(ctx);
      return;
    }

    const anglePerBmi = Math.PI / 50;
    const targetAngle = anglePerBmi * Math.min(50, Math.max(0, bmi)) - Math.PI;
    const startAngle = currentAngleRef.current;
    const startTime = performance.now();
    const duration = 500; // ms
    let animationFrameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + (targetAngle - startAngle) * ease;

      drawColoredDiagram(ctx);
      drawArrow(ctx, angle);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        currentAngleRef.current = targetAngle;
        setCurrentAngle(targetAngle);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [bmi, setCurrentAngle]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} className="bmi-chart mx-auto" width="400" height="200" />
    </div>
  );
}
