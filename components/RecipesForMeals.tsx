export default function RecipesForMeals() {
  const { mealData } = { mealData: [] as Record<string, string>[] };
  
  return (
    <>
      {mealData.map((data) => (
        <div key={data.idMeal} style={{ textAlign: "center" }}>
          <h1>{data.strMeal}</h1>
          <p style={{ fontSize: "14px" }}>{data.strInstructions}</p>
        </div>
      ))}
    </>
  );
};
