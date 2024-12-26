import "../styles/BMI.css";
import FooterNav from "../components/HeaderNav";

const BMI = () => {
  return (
    <div className="bmi-container">
      <h1>Kalkulator BMI</h1>
      <p>Wprowadź swoje dane, aby obliczyć BMI:</p>
      <form className="bmi-form">
        <div className="bmi-input-group">
          <label>
            Waga (kg):
            <input type="number" placeholder="Podaj wagę" />
          </label>
        </div>
        <div className="bmi-input-group">
          <label>
            Wzrost (cm):
            <input type="number" placeholder="Podaj wzrost" />
          </label>
        </div>
        <button type="submit" className="bmi-button">
          Oblicz
        </button>
      </form>
      <FooterNav />
    </div>
  );
};

export default BMI;
