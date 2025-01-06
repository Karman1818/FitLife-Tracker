import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BMI from "./pages/BMI";
import Profile from "./pages/Profile";
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
      <HeaderNav />
      <FooterNav />
    </Router>
  );
};

export default App;
