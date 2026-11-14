export function calculateBmi(weight: number, height: number): number {
  if (height <= 0 || weight <= 0) return 0;
  return Number((weight / Math.pow(height / 100, 2)).toFixed(2));
}

export function getBMICategory(bmi: number | null): string {
  if (bmi === null || bmi <= 0) return "Unknown category";

  if (bmi < 16) {
    return "Severe Underweight";
  } else if (bmi >= 16 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal Weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obesity Class I";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obesity Class II";
  } else {
    return "Obesity Class III";
  }
}

export function getBMICategoryColor(bmi: number | null): string {
  if (bmi === null || bmi <= 0) return "black";

  if (bmi < 10) {
    return "#FF5722";
  } else if (bmi >= 10 && bmi < 16) {
    return "#FF9800";
  } else if (bmi >= 16 && bmi <= 17) {
    return "#FFE400";
  } else if (bmi >= 17 && bmi < 18.5) {
    return "#D4E157";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "#4CAF50";
  } else if (bmi >= 25 && bmi < 30) {
    return "#FF9800";
  } else if (bmi >= 30 && bmi < 35) {
    return "#FF5722";
  } else if (bmi >= 35 && bmi < 40) {
    return "#D20000";
  } else {
    return "#900000";
  }
}

export function isExtremeBMI(bmiValue: number | null): boolean {
  if (bmiValue === null || bmiValue <= 0) return false;
  return bmiValue < 16 || bmiValue > 40;
}
