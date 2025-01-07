
import {Link} from "react-router-dom";

export const Navigation = () => {

    return(
            <nav>
                <Link to={"/"}>Calories </Link>
                <Link to={"/BMI"}>Bmi </Link>
                <Link to={"/Meals"}>Meals </Link>
                <Link to={"/Profile"}>Profile </Link>
            </nav>
    )
}