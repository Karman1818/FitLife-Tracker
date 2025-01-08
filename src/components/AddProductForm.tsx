import { ChangeEvent, FormEvent, useState } from "react";
import Select from 'react-select';

type ProductOption = {
  label: string;
  value: string;
};

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    category: "",
    favorite: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) {
      alert("Fill in the required fields!");
      return;
    }
    alert(`Product added: ${JSON.stringify(formData)}`);
  };

  const [options, setOptions] = useState<ProductOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (inputValue: string) => {
    if (!inputValue) return [];
    const URL = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(inputValue)}&search_simple=1&json=1`;

    try {
      setIsLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      const products = data.products.map((product) => ({
        label: product.product_name || 'Unknown name',
        value: product.id || product.code,
      }));
      setOptions(products);
    } catch (error) {
      console.error('Error while downloading products', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (newValue: string) => {
    fetchProducts(newValue);
  };

  const handleSelectChange = (selectedOption: ProductOption | null) => {
    setFormData({
      ...formData,
      name: selectedOption?.label || '',
    });
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nazwa produktu:
            <Select
                options={options}
                onInputChange={handleInputChange}
                isLoading={isLoading}
                placeholder="Enter the product name..."
                noOptionsMessage={() => 'Brak wyników'}
                value={options.find(option => option.label === formData.name) || null}
                onChange={handleSelectChange}
            />
          </label>
        </div>
        <div>
          <label>
            Calories:
            <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
            />
          </label>
        </div>
        <div>
          <label>
            Category:
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
            Add to favourite:
            <input
                type="checkbox"
                name="favorite"
                checked={formData.favorite}
                onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Add porduct</button>
      </form>
  );
};

export default AddProductForm;
