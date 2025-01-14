import React, { useState } from "react";
import { Product } from "@/lib/types";

interface Props {
  onAddProduct: (product: Omit<Product, "id">) => void;
}

export default function({ onAddProduct }: Props) {
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
    
    setFormData({
      name: "",
      calories: "",
      water: "",
      category: "",
      favorite: false,
    });
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white/10 border-2 border-white/5 shadow-lg m-1 p-1 rounded-lg space-y-1 backdrop-blur-md"
    >
      <label
        htmlFor="product-name"
        className="text-sm mr-1 select-none"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
        id="product-name"
      />
      <label
        htmlFor="product-calories"
        className="text-sm mr-1 select-none"
      >
        Calories (kcal)
      </label>
      <input
        type="number"
        name="calories"
        value={formData.calories}
        onChange={handleChange}
        className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
        id="product-calories"
      />
      <label
        htmlFor="product-water"
        className="text-sm mr-1 select-none"
      >
        Water (ml)
      </label>
      <input
        type="number"
        name="water"
        value={formData.water}
        onChange={handleChange}
        className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
        id="product-water"
      />
      <label
        htmlFor="product-category"
        className="text-sm mr-1 select-none"
      >
        Category
      </label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="focus:outline-none bg-white/10 rounded-sm py-[1px] px-1 no-spinner"
        id="product-category"
      />
      <label
        htmlFor="product-favorite"
        className="text-sm mr-1 select-none cursor-pointer"
      >
        Favorite
      </label>
      <input
        type="checkbox"
        name="favorite"
        checked={formData.favorite}
        onChange={handleChange}
        className="hidden peer"
        id="product-favorite"
      />
      <button type="submit" className="inline-block">Add Product</button>
    </form>
  );
};