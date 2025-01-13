import PieChartComponent from "@/components/PieChartOutline";

interface Props {
  title: string;
  percentage: number;
  goal: number;
  setGoal: (value: number) => void;
  unit: string;
  value: number;
  remainingValue: number;
}

export default function GoalCard({
  title,
  percentage,
  goal,
  setGoal,
  unit,
  value,
  remainingValue,
}: Props) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <PieChartComponent
        percentage={percentage}
        size={200}
        value={value}
        unit={unit}
        remainingValue={remainingValue} // Przekazanie pozostałej wartości
      />
      <div>
        <label>
          Cel {unit}:
          <input
            style={{ width: "50px" }}
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}