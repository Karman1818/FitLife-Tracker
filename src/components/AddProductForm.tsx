import React, { useState } from "react";

interface AddProductFormProps {
  onCaloriesChange: (calories: number) => void; // Callback do aktualizacji spożytych kalorii
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCaloriesChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calories = parseInt(formData.calories, 10);
    if (calories) {
      onCaloriesChange((prev) => prev + calories); // Aktualizujemy spożyte kalorie
      setFormData({ name: "", calories: "" }); // Resetujemy formularz
    } else {
      alert("Wprowadź liczbę kalorii!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nazwa produktu:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Kalorie:
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Dodaj produkt</button>
    </form>
  );
};

export default AddProductForm;
