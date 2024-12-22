import { useState } from 'react';

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    category: '',
    favorite: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) {
      alert('Wypełnij wymagane pola!');
      return;
    }
    alert(`Produkt dodany: ${JSON.stringify(formData)}`);
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
            required
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
}

export default AddProductForm;
