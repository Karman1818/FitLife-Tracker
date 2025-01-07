
import {useCaloriesStore} from "../state/caloriesStore.ts";
export const CaloriesManager = () => {

    const Days = useCaloriesStore(state => state.days)
    const addProductToMeal = useCaloriesStore(state => state.addProductToMeal)


    return(
        <>
            {Days.map((day) => (
                <div key={day.id}>
                    {day.name}
                    {day.meals.map((meal) => (
                        <span key={meal.id}>
                            {meal.name}
                            {meal.products.map((product) => (
                                <p key={product.id}>
                                    {product.name}

                                </p>
                            ))}
                        </span>
                    ))}
                </div>
            ))}
        </>
    )
}