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
  calories100g?: number;
  protein100g?: number;
  carbs100g?: number;
  fat100g?: number;
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
  const [baseNutrientsPer100g, setBaseNutrientsPer100g] = useState<{
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  } | null>(null);

  const addProductToMeal = useCaloriesStore((state) => state.addProductToMeal);

  const [options, setOptions] = useState<ProductOption[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingNutrients, setIsLoadingNutrients] = useState(false);

  const applyNutrientsScaling = (
    nutrients100g: { calories: number; protein: number; carbohydrates: number; fat: number },
    weight: number
  ) => {
    const mult = (isNaN(weight) || weight <= 0 ? 100 : weight) / 100;
    setFormData((prev) => ({
      ...prev,
      calories: Math.round(nutrients100g.calories * mult).toString(),
      protein: (nutrients100g.protein * mult).toFixed(1),
      carbohydrates: (nutrients100g.carbohydrates * mult).toFixed(1),
      fat: (nutrients100g.fat * mult).toFixed(1),
    }));
  };

  const fetchProductNutrients = async (productCode: string, weightInGrams: number) => {
    if (!productCode) return;
    const URL = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(productCode)}.json`;

    try {
      setIsLoadingNutrients(true);
      const response = await fetch(URL);
      const data = await response.json();
      const productData = data.product;

      if (!productData) return;

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

      setBaseNutrientsPer100g(nutrientsPer100g);
      applyNutrientsScaling(nutrientsPer100g, weightInGrams);
    } catch (error) {
      console.error("Fetching nutriments error", error);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  const handleWeightChange = (newWeightStr: string) => {
    const oldWeight = parseFloat(formData.weightInGrams) || 100;
    const newWeight = parseFloat(newWeightStr);

    let currentBase = baseNutrientsPer100g;
    if (!currentBase) {
      const curCal = parseFloat(formData.calories);
      const curProt = parseFloat(formData.protein);
      const curCarbs = parseFloat(formData.carbohydrates);
      const curFat = parseFloat(formData.fat);
      if (!isNaN(curCal) || !isNaN(curProt) || !isNaN(curCarbs) || !isNaN(curFat)) {
        currentBase = {
          calories: !isNaN(curCal) && oldWeight > 0 ? (curCal / oldWeight) * 100 : 0,
          protein: !isNaN(curProt) && oldWeight > 0 ? (curProt / oldWeight) * 100 : 0,
          carbohydrates: !isNaN(curCarbs) && oldWeight > 0 ? (curCarbs / oldWeight) * 100 : 0,
          fat: !isNaN(curFat) && oldWeight > 0 ? (curFat / oldWeight) * 100 : 0,
        };
        setBaseNutrientsPer100g(currentBase);
      }
    }

    setFormData((prev) => {
      if (currentBase && !isNaN(newWeight) && newWeight > 0) {
        const mult = newWeight / 100;
        return {
          ...prev,
          weightInGrams: newWeightStr,
          calories: Math.round(currentBase.calories * mult).toString(),
          protein: (currentBase.protein * mult).toFixed(1),
          carbohydrates: (currentBase.carbohydrates * mult).toFixed(1),
          fat: (currentBase.fat * mult).toFixed(1),
        };
      }
      return {
        ...prev,
        weightInGrams: newWeightStr,
      };
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "weightInGrams") {
      handleWeightChange(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update base nutrients per 100g when user manually adjusts values
    const w = parseFloat(formData.weightInGrams) || 100;
    if (w > 0) {
      const num = parseFloat(value) || 0;
      const getRatio = (val: string) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && w > 0 ? (parsed / w) * 100 : 0;
      };
      setBaseNutrientsPer100g((prev) => ({
        calories: name === "calories" ? (num / w) * 100 : (prev?.calories ?? getRatio(formData.calories)),
        protein: name === "protein" ? (num / w) * 100 : (prev?.protein ?? getRatio(formData.protein)),
        carbohydrates: name === "carbohydrates" ? (num / w) * 100 : (prev?.carbohydrates ?? getRatio(formData.carbohydrates)),
        fat: name === "fat" ? (num / w) * 100 : (prev?.fat ?? getRatio(formData.fat)),
      }));
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
    setBaseNutrientsPer100g(null);
  };

  const fetchProducts = async (inputValue: string) => {
    if (!inputValue || inputValue.trim().length < 2) return;

    try {
      setIsLoadingProducts(true);

      // 1. First attempt internal server proxy (CORS-safe)
      const res = await fetch(`/api/food/search?q=${encodeURIComponent(inputValue.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          const products: ProductOption[] = data.products.map(
            (p: {
              label: string;
              code: string;
              brand?: string;
              calories100g: number;
              protein100g: number;
              carbs100g: number;
              fat100g: number;
            }) => ({
              label: p.brand ? `${p.label} (${p.brand})` : p.label,
              value: p.code,
              calories100g: p.calories100g,
              protein100g: p.protein100g,
              carbs100g: p.carbs100g,
              fat100g: p.fat100g,
            })
          );
          setOptions(products);
          return;
        }
      }

      // 2. Direct fallback
      const URL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        inputValue
      )}&search_simple=1&json=1`;
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

      const currentWeight = parseFloat(formData.weightInGrams) || 100;

      // If search already returned full macros, scale immediately without waiting for extra network fetch
      if (selectedOption.calories100g !== undefined) {
        const base = {
          calories: selectedOption.calories100g,
          protein: selectedOption.protein100g || 0,
          carbohydrates: selectedOption.carbs100g || 0,
          fat: selectedOption.fat100g || 0,
        };
        setBaseNutrientsPer100g(base);
        applyNutrientsScaling(base, currentWeight);
      } else {
        await fetchProductNutrients(selectedOption.value, currentWeight);
      }
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
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium">Weight (in grams):</label>
          {baseNutrientsPer100g && (
            <span className="text-xs text-green-400 font-bold px-1.5 py-0.5 bg-green-500/20 rounded">
              ⚡ Autoscaling
            </span>
          )}
        </div>
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
        {/* Quick portion buttons */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {["50", "100", "150", "200", "250", "300"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleWeightChange(g)}
              className={`text-xs font-semibold px-2.5 py-1 rounded border transition-all ${
                formData.weightInGrams === g
                  ? "bg-green-600 text-white border-green-400 shadow-sm"
                  : "bg-white/5 text-white/70 border-white/15 hover:bg-white/15 hover:text-white"
              }`}
            >
              {g}g
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-white/70">
            Nutritional Values ({formData.weightInGrams || 100}g portion):
          </label>
          {isLoadingNutrients && (
            <span className="text-[10px] text-yellow-300 animate-pulse font-medium">
              Loading nutrients...
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="bg-white/5 border border-green-500/30 p-2 rounded text-center">
            <div className="text-xs text-green-300 font-medium">Calories</div>
            <input
              type="text"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-transparent text-center font-bold text-lg text-green-400 focus:outline-none"
            />
            <span className="text-[10px] text-white/40">kcal</span>
          </div>

          <div className="bg-white/5 border border-blue-500/30 p-2 rounded text-center">
            <div className="text-xs text-blue-300 font-medium">Protein</div>
            <input
              type="text"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-transparent text-center font-bold text-lg text-blue-400 focus:outline-none"
            />
            <span className="text-[10px] text-white/40">grams</span>
          </div>

          <div className="bg-white/5 border border-yellow-500/30 p-2 rounded text-center">
            <div className="text-xs text-yellow-300 font-medium">Carbs</div>
            <input
              type="text"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-transparent text-center font-bold text-lg text-yellow-400 focus:outline-none"
            />
            <span className="text-[10px] text-white/40">grams</span>
          </div>

          <div className="bg-white/5 border border-red-500/30 p-2 rounded text-center">
            <div className="text-xs text-red-300 font-medium">Fat</div>
            <input
              type="text"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              placeholder="0"
              className="w-full bg-transparent text-center font-bold text-lg text-red-400 focus:outline-none"
            />
            <span className="text-[10px] text-white/40">grams</span>
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
