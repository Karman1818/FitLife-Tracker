import React, { useState } from "react";
import { Product } from "@/lib/types";

interface Props {
  onAddProduct: (product: Omit<Product, "id">) => void;
}

export default function AddProductForm({ onAddProduct }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    water: "",
    category: "",
    favorite: false,
  });
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if(!formData.name || (!formData.calories && !formData.water)) {
      alert("Wypełnij wymagane pola!");
      return;
    }
    
    onAddProduct({
      name: formData.name,
      calories: parseFloat(formData.calories) || 0,
      water: parseFloat(formData.water) || 0,
      category: formData.category || "Brak",
      favorite: formData.favorite,
    });
    
    // Reset formularza
    setFormData({
      name: "",
      calories: "",
      water: "",
      category: "",
      favorite: false,
    });
  }
  
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
            required
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
          />
        </label>
      </div>
      <div>
        <label>
          Woda (ml):
          <input
            type="number"
            name="water"
            value={formData.water}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Kategoria:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Dodaj do ulubionych:
          <input
            type="checkbox"
            name="favorite"
            checked={formData.favorite}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Dodaj produkt</button>
    </form>
  );
};