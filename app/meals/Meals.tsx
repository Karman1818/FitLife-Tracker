import FooterNav from "../components/FooterNav";
import { RecipesComponent } from "../components/RecipesComponent.tsx";
import "../styles/Profile.css";

const Meals = () => {


    return (
        <div>
            <h1>Meals Recipes</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '170px' }}>
                <RecipesComponent />
                <RecipesComponent />
                <RecipesComponent />
            </div>

            <button onClick={() => window.location.reload()}>reload</button>
            <FooterNav />
        </div>
    );
};

export default Meals;
