import  { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const MedicineForm = ({ fetchMedicines, closeForm }) => {
  const [formData, setFormData] = useState({
    medicine_name: '',
    category: '',
    type: '',
    brand: '',
    strength: '',
    exp_date: '',
    price_of_sell: '',
    price_of_buy: '',
    quantity: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/server/med-admin/medicines', formData);
      fetchMedicines();
      closeForm();
    } catch (error) {
      console.error('Error adding medicine', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" name="medicine_name" value={formData.medicine_name} onChange={handleInputChange} placeholder="Medicine Name" className="mr-2" required />
      <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="mr-2" required />
      <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" className="mr-2" required />
      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Brand" className="mr-2" required />
      <input type="text" name="strength" value={formData.strength} onChange={handleInputChange} placeholder="Strength" className="mr-2" required />
      <input type="date" name="exp_date" value={formData.exp_date} onChange={handleInputChange} placeholder="Expire Date" className="mr-2" required />
      <input type="number" name="price_of_sell" value={formData.price_of_sell} onChange={handleInputChange} placeholder="Price of Sell" className="mr-2" required />
      <input type="number" name="price_of_buy" value={formData.price_of_buy} onChange={handleInputChange} placeholder="Price of Buy" className="mr-2" required />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" className="mr-2" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Medicine</button>
      <button type="button" onClick={closeForm} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
    </form>
  );
};

MedicineForm.propTypes = {
  fetchMedicines: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default MedicineForm;
