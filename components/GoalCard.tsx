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
  const id = "goal-card-" + title.toLowerCase().replace(/[ _]/g, "-");
  
  return (
    <div className="bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md flex flex-col items-center">
      <h3 className="text-md font-semibold">{title}</h3>
      <PieChartComponent
        percentage={percentage}
        size={200}
        value={value}
        unit={unit}
        remainingValue={remainingValue}
      />
      <label htmlFor={id} className="text-sm mr-1">{unit} goal:</label>
      <input
        id={id}
        type="number"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner w-16"
      />
    </div>
  );
}