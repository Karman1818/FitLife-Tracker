import { describe, it, expect } from "vitest";
import {
  calculateBmi,
  getBMICategory,
  getBMICategoryColor,
  isExtremeBMI,
} from "@/lib/bmi";

describe("BMI Calculation & Categorization", () => {
  it("should calculate correct BMI for standard adult inputs", () => {
    // 70 kg, 175 cm => 70 / (1.75 * 1.75) = 22.857... => 22.86
    expect(calculateBmi(70, 175)).toBe(22.86);

    // 87 kg, 185 cm => 87 / (1.85 * 1.85) = 25.42
    expect(calculateBmi(87, 185)).toBe(25.42);
  });

  it("should return 0 for non-positive height or weight", () => {
    expect(calculateBmi(0, 180)).toBe(0);
    expect(calculateBmi(70, 0)).toBe(0);
    expect(calculateBmi(-10, 180)).toBe(0);
  });

  it("should classify BMI categories accurately", () => {
    expect(getBMICategory(null)).toBe("Unknown category");
    expect(getBMICategory(0)).toBe("Unknown category");
    expect(getBMICategory(15)).toBe("Severe Underweight");
    expect(getBMICategory(17.5)).toBe("Underweight");
    expect(getBMICategory(22)).toBe("Normal Weight");
    expect(getBMICategory(27)).toBe("Overweight");
    expect(getBMICategory(32)).toBe("Obesity Class I");
    expect(getBMICategory(37)).toBe("Obesity Class II");
    expect(getBMICategory(42)).toBe("Obesity Class III");
  });

  it("should return corresponding category colors", () => {
    expect(getBMICategoryColor(null)).toBe("black");
    expect(getBMICategoryColor(22)).toBe("#4CAF50"); // Normal
    expect(getBMICategoryColor(27)).toBe("#FF9800"); // Overweight
    expect(getBMICategoryColor(32)).toBe("#FF5722"); // Obesity I
    expect(getBMICategoryColor(45)).toBe("#900000"); // Obesity III
  });

  it("should detect extreme BMI thresholds correctly", () => {
    expect(isExtremeBMI(null)).toBe(false);
    expect(isExtremeBMI(22)).toBe(false);
    expect(isExtremeBMI(15.5)).toBe(true);
    expect(isExtremeBMI(42)).toBe(true);
  });
});
