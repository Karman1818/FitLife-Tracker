
import {Link} from "react-router-dom";

export const Navigation = () => {

    return(
            <Link>
                <Link to={"/"}>Home </Link>
                <Link to={"/Calories"}>Caloreis </Link>
                <Link to={"/BMI"}>Bmi </Link>
                <Link to={"/Meals"}>Meals </Link>
                <Link to={"/Profile"}>Profile </Link>
            </Link>
    )
}