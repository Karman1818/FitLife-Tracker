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
  const [selectedProductCode, setSelectedProductCode] = useState<string>("");

  const addProductToMeal = useCaloriesStore((state) => state.addProductToMeal);

  const [options, setOptions] = useState<ProductOption[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingNutrients, setIsLoadingNutrients] = useState(false);

  const fetchProductNutrients = async (productCode: string, weightInGrams: number) => {
    if (!productCode) return;
    const URL = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(productCode)}.json`;

    try {
      setIsLoadingNutrients(true);
      const response = await fetch(URL);
      const data = await response.json();
      const productData = data.product;

      if (!productData) return;

      // OpenFoodFacts provides energy in kJ and energy-kcal in kcal
      const kcal100g =
        productData.nutriments?.["energy-kcal_100g"] ??
        productData.nutriments?.["energy-kcal"] ??
        (productData.nutriments?.energy ? Math.round(Number(productData.nutriments.energy) / 4.184) : 0);

      const nutrientsPer100g = {
        calories: Number(kcal100g) || 0,
        protein: Number(productData.nutriments?.proteins_100g) || 0,
        carbohydrates: Number(productData.nutriments?.carbohydrates_100g) || 0,
        fat: Number(productData.nutriments?.fat_100g) || 0,
      };

      const multiplier = (isNaN(weightInGrams) || weightInGrams <= 0 ? 100 : weightInGrams) / 100;

      setFormData((prevFormData) => ({
        ...prevFormData,
        calories: (nutrientsPer100g.calories * multiplier).toFixed(1),
        protein: (nutrientsPer100g.protein * multiplier).toFixed(1),
        carbohydrates: (nutrientsPer100g.carbohydrates * multiplier).toFixed(1),
        fat: (nutrientsPer100g.fat * multiplier).toFixed(1),
      }));
    } catch (error) {
      console.error("Fetching nutriments error", error);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "weightInGrams" && selectedProductCode) {
      const parsedWeight = parseFloat(value);
      if (!isNaN(parsedWeight) && parsedWeight > 0) {
        fetchProductNutrients(selectedProductCode, parsedWeight);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.weightInGrams) {
      alert("Fill in the required fields!");
      return;
    }
    const product = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: formData.name,
      weightInGrams: parseFloat(formData.weightInGrams),
      calories: formData.calories || "0",
      protein: formData.protein || "0",
      carbohydrates: formData.carbohydrates || "0",
      fat: formData.fat || "0",
    };
    addProductToMeal(dayId, mealId, product);

    // Reset form after adding
    setFormData({
      name: "",
      weightInGrams: "100",
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
    });
    setSelectedProductCode("");
  };

  const fetchProducts = async (inputValue: string) => {
    if (!inputValue || inputValue.trim().length < 2) return;
    const URL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      inputValue
    )}&search_simple=1&json=1`;

    try {
      setIsLoadingProducts(true);
      const response = await fetch(URL);
      const data = await response.json();
      if (Array.isArray(data.products)) {
        const products = data.products
          .filter((p: { product_name?: string }) => Boolean(p.product_name))
          .map((product: { product_name?: string; id?: string; code?: string }) => ({
            label: product.product_name || "Unknown product",
            value: product.code || product.id || "",
          }));
        setOptions(products);
      }
    } catch (error) {
      console.error("Error while searching products", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    fetchProducts(newValue);
  };

  const handleSelectChange = async (selectedOption: ProductOption | null) => {
    if (selectedOption) {
      setSelectedProductCode(selectedOption.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: selectedOption.label,
      }));
      await fetchProductNutrients(selectedOption.value, parseFloat(formData.weightInGrams) || 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name:</label>
        <div className="text-black">
          <Select
            options={options}
            onInputChange={handleInputChange}
            isLoading={isLoadingProducts}
            placeholder="Search product (e.g. Oats, Chicken breast)..."
            noOptionsMessage={() => "No results found"}
            value={options.find((option) => option.label === formData.name) || (formData.name ? { label: formData.name, value: selectedProductCode } : null)}
            onChange={handleSelectChange}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Weight (in grams):</label>
        <input
          type="number"
          name="weightInGrams"
          value={formData.weightInGrams}
          onChange={handleChange}
          required
          min="1"
          step="any"
          className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/50"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        <div className="bg-white/5 p-2 rounded text-center">
          <div className="text-xs text-white/60">Calories</div>
          <div className="font-semibold text-lg text-green-400">
            {isLoadingNutrients ? "..." : `${formData.calories || 0} kcal`}
          </div>
        </div>
        <div className="bg-white/5 p-2 rounded text-center">
          <div className="text-xs text-white/60">Protein</div>
          <div className="font-semibold text-lg text-blue-400">
            {isLoadingNutrients ? "..." : `${formData.protein || 0}g`}
          </div>
        </div>
        <div className="bg-white/5 p-2 rounded text-center">
          <div className="text-xs text-white/60">Carbs</div>
          <div className="font-semibold text-lg text-yellow-400">
            {isLoadingNutrients ? "..." : `${formData.carbohydrates || 0}g`}
          </div>
        </div>
        <div className="bg-white/5 p-2 rounded text-center">
          <div className="text-xs text-white/60">Fat</div>
          <div className="font-semibold text-lg text-red-400">
            {isLoadingNutrients ? "..." : `${formData.fat || 0}g`}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors shadow-md"
      >
        Add to meal
      </button>
    </form>
  );
}
