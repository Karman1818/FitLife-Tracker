import { useParams } from "react-router-dom";

const Meals = () => {
    const { userId } = useParams<{ userId: string }>();
    return <h1>Sugestie posiłkow dla usera {userId}</h1>;
};

export default Meals;
