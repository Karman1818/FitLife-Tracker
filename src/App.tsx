import { Router } from "./components/Router";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
import "./App.css";

const App = () => {
  return (
    <div>
      <Router />
      <HeaderNav />
      <FooterNav />
    </div>
  );
};

export default App;
