import { ChangeEvent, FormEvent, useState } from "react";
import { useCaloriesStore } from '../state/caloriesStore.ts';
import Select from 'react-select';

type ProductOption = {
  label: string;
  value: string;
};

const AddProductForm = ({mealId, dayId}) => {
  const [formData, setFormData] = useState({
    name: "",
    weightInGrams: "",
    calories:"",
    protein:"",
    carbohydrates:"",
    fat:"",
  });

  const addProductToMeal = useCaloriesStore((state) => state.addProductToMeal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.weightInGrams) {
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
  const [isLoadingNutrients, setIsLoadingNutrients] = useState(false);

  const fetchProductNutrients = async (productId: string) => {
    const URL = `https://world.openfoodfacts.org/api/v0/product/${productId}.json`;

    try {
      setIsLoadingNutrients(true);
      const response = await fetch(URL);
      const data = await response.json();
      const productData = data.product;

      const nutriments = {
        calories: productData.nutriments?.energy || 'Unknown',
        protein: productData.nutriments?.proteins_100g || 'Unknown',
        carbohydrates: productData.nutriments?.carbohydrates_100g || 'Unknown',
        fat: productData.nutriments?.fat_100g || 'Unknown',
      };

      setFormData(prevFormData => ({
        ...prevFormData,
        calories: nutriments.calories,
        protein: nutriments.protein,
        carbohydrates: nutriments.carbohydrates,
        fat: nutriments.fat,
      }));

    } catch (error) {
      console.error('Fetching nutriments error', error);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  const fetchProducts = async (inputValue: string) => {
    if (!inputValue) return [];
    const URL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(inputValue)}&search_simple=1&json=1`;

    try {
      setIsLoadingProducts(true);
      const response = await fetch(URL);
      const data = await response.json();
      const products = data.products.map((product: any) => ({
        label: product.product_name || 'Unknown name',
        value: product.id || product.code,
      }));
      setOptions(products);
    } catch (error) {
      console.error('Error while downloading products', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    fetchProducts(newValue);
  };


  const handleSelectChange = async (selectedOption: ProductOption | null) => {
    if (selectedOption) {
      setFormData(prevFormData => ({
        ...prevFormData,
        name: selectedOption.label,
      }));
      await fetchProductNutrients(selectedOption.value);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name:
            <Select
                options={options}
                onInputChange={handleInputChange}
                isLoading={isLoadingProducts}
                placeholder="Enter the product name..."
                noOptionsMessage={() => 'No results found'}
                value={options.find(option => option.label === formData.name) || null}
                onChange={handleSelectChange}
            />
          </label>
        </div>
        <div>
          <label>
            Weight (in grams):
            <input
                type="number"
                name="weightInGrams"
                value={formData.weightInGrams}
                onChange={handleChange}
                required
            />
          </label>
        </div>
        <div>
          <label>
            Calories: {formData.calories}
          </label>
        </div>
        <div>
          <label>
            Protein: {formData.protein}
          </label>
        </div>
        <div>
          <label>
            Carbohydrates: {formData.carbohydrates}
          </label>
        </div>
        <div>
          <label>
            Fats: {formData.fat}
          </label>
        </div>
        <button type="submit">Add product</button>
      </form>
  );
};

export default AddProductForm;
