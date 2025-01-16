import { useLocation, useNavigate } from "react-router-dom";

export const RecipesForMeals = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mealData } = location.state || { mealData: [] };

    return (
        <>
            {mealData.map((data) => (
                <div key={data.idMeal} style={{ textAlign: 'center' }}>
                    <h1>{data.strMeal}</h1>
                    <p style={{ fontSize: '14px' }}>{data.strInstructions}</p>
                </div>
            ))}
            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
};
