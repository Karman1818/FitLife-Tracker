import { CaloriesManager } from "../components/CaloriesManager.tsx";
import HeaderNav from "../components/HeaderNav.tsx";
import FooterNav from "../components/FooterNav.tsx";


const Calories = () => {
  return (
    <div>
      <HeaderNav />
      <CaloriesManager />
      <FooterNav />
    </div>
  );
};

export default Calories;
