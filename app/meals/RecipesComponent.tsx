import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RecipesComponent = () => {
    const navigate = useNavigate();
    const [mealData, setMealData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const URL = "https://www.themealdb.com/api/json/v1/1/random.php";

    useEffect(() => {
        setIsLoading(true);
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setMealData([data.meals[0]]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const goToRecipes = () => {
        navigate("/meals/recipes", { state: { mealData } });
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {mealData.map((data) => (
                        <div onClick={goToRecipes} key={data.idMeal} style={{ textAlign: 'center' }}>
                            <img
                                style={{ width: '400px', height: 'auto', borderRadius: '4px' }}
                                src={data.strMealThumb}
                                alt={data.strMeal}
                            />
                            <p style={{ fontSize: '14px' }}>{data.strMeal}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};
