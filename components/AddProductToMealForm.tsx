"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useCaloriesStore, Meal, Day } from "@/stores/calories";
import Select from "react-select";

interface Props {
  mealId: Meal["id"];
  dayId: Day["id"];
}

interface ProductOption {
  label: string;
  value: string;
}

export default function AddProductToMealForm({ mealId, dayId }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    weightInGrams: "100",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
  });

  const addProductToMeal = useCaloriesStore((state) => state.addProductToMeal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if(name === "weightInGrams") {
      fetchProductNutrients(formData.name, parseFloat(value)).then();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.name || !formData.weightInGrams) {
      alert("Fill in the required fields!");
      return;
    }
    const product = {
      id: Math.floor(Math.random() * 1000),
      name: formData.name,
      weightInGrams: parseFloat(formData.weightInGrams),
      calories: formData.calories,
      protein: formData.protein,
      carbohydrates: formData.carbohydrates,
      fat: formData.fat,
    };
    addProductToMeal(dayId, mealId, product);
  };

  const [options, setOptions] = useState<ProductOption[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [/*isLoadingNutrients*/, setIsLoadingNutrients] = useState(false);

  const fetchProductNutrients = async(productId: string, weightInGrams: number) => {
    const URL = `https://world.openfoodfacts.org/api/v0/product/${productId}.json`;

    try {
      setIsLoadingNutrients(true);
      const response = await fetch(URL);
      const data = await response.json();
      const productData = data.product;

      const nutrientsPer100g = {
        calories: productData.nutriments?.energy || 0,
        protein: productData.nutriments?.proteins_100g || 0,
        carbohydrates: productData.nutriments?.carbohydrates_100g || 0,
        fat: productData.nutriments?.fat_100g || 0,
      };

      const multiplier = weightInGrams / 100;

      setFormData(prevFormData => ({
        ...prevFormData,
        calories: (nutrientsPer100g.calories * multiplier).toFixed(2),
        protein: (nutrientsPer100g.protein * multiplier).toFixed(2),
        carbohydrates: (nutrientsPer100g.carbohydrates * multiplier).toFixed(2),
        fat: (nutrientsPer100g.fat * multiplier).toFixed(2),
      }));

    } catch(error) {
      console.error("Fetching nutriments error", error);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  const fetchProducts = async(inputValue: string) => {
    if(!inputValue) return [];
    const URL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(inputValue)}&search_simple=1&json=1`;

    try {
      setIsLoadingProducts(true);
      const response = await fetch(URL);
      const data = await response.json();
      const products = data.products.map((product: Record<string, string>) => ({
        label: product.product_name || "Unknown name",
        value: product.id || product.code,
      }));
      setOptions(products);
    } catch(error) {
      console.error("Error while downloading products", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    fetchProducts(newValue);
  };

  const handleSelectChange = async(selectedOption: ProductOption | null) => {
    if(selectedOption) {
      setFormData(prevFormData => ({
        ...prevFormData,
        name: selectedOption.label,
      }));
      await fetchProductNutrients(selectedOption.value, parseFloat(formData.weightInGrams));
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>

            Weight (in grams):
          <label className="block text-black">
            <input
                type="number"
                name="weightInGrams"
                value={formData.weightInGrams}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
        <div>

            Product Name:
          <label className="block text-black">
            <Select
                options={options}
                onInputChange={handleInputChange}
                isLoading={isLoadingProducts}
                placeholder="Enter the product name..."
                noOptionsMessage={() => "No results found"}
                value={options.find(option => option.label === formData.name) || null}
                onChange={handleSelectChange}
                className="mt-1"
            />
          </label>
        </div>
        <div>
          <label>
            Calories: {formData.calories}
          </label>
        </div>
        <div>
          <label >
            Protein: {formData.protein}
          </label>
        </div>
        <div>
          <label >
            Carbohydrates: {formData.carbohydrates}
          </label>
        </div>
        <div>
          <label>
            Fats: {formData.fat}
          </label>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Add product
        </button>
      </form>
  );
}
