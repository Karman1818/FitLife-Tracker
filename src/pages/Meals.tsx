import FooterNav from "../components/FooterNav";
import HeaderNav from "../components/HeaderNav";

const Meals = () => {
  return (
    <div>
      <div className="meals-container">
        <h1>Meals</h1>
        <p>Welcome to the Meals page!</p>
      </div>
      <HeaderNav />
      <FooterNav />
    </div>
  );
};

export default Meals;
