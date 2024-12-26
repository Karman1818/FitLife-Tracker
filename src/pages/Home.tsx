import "../styles/Home.css";
import AddProductForm from "../components/AddProductForm";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Strona Główna</h1>
      <p>Witaj w aplikacji do mierzenia kalorii z posiłków!</p>
      <AddProductForm />
    </div>
  );
};

export default Home;
