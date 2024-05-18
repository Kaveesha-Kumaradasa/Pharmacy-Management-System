import  { useEffect, useState } from 'react';
import axios from 'axios';

const MedicineAdmin = () => {
  const [medicines, setMedicines] = useState([]);
  const [formType, setFormType] = useState(''); // 'add' or 'edit'
  const [editingMedicine, setEditingMedicine] = useState(null);
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

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:8800/server/med-admin/medicines');
      setMedicines(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching medicines', error);
      setMedicines([]);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (medicine) => {
    setFormType('edit');
    setEditingMedicine(medicine);
    setFormData({
      medicine_name: medicine.medicine_name,
      category: medicine.category,
      type: medicine.type,
      brand: medicine.brand,
      strength: medicine.strength,
      exp_date: medicine.exp_date.split('T')[0], // To handle date input format
      price_of_sell: medicine.price_of_sell,
      price_of_buy: medicine.price_of_buy,
      quantity: medicine.quantity
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/server/med-admin/medicines/${id}`);
      console.log(response.data.message);
      fetchMedicines();
    } catch (error) {
      console.error('Error deleting medicine', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === 'add') {
        const response = await axios.post('http://localhost:8800/server/med-admin/medicines', formData);
        console.log(response.data.message);
      } else if (formType === 'edit' && editingMedicine) {
        const { med_id, category, type, brand } = editingMedicine;
        const key = `${med_id}-${category}-${type}-${brand}`;
        const response = await axios.put(`http://localhost:8800/server/med-admin/medicines/${key}`, formData);
        console.log(response.data.message);
      }
      setFormType('');
      setEditingMedicine(null);
      setFormData({
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
      fetchMedicines();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleAddClick = () => {
    setFormType('add');
    setEditingMedicine(null);
    setFormData({
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
  };

  const handleCancelClick = () => {
    setFormType('');
    setEditingMedicine(null);
    setFormData({
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
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Inventory</h1>
      <button onClick={handleAddClick} className="bg-blue-500 text-white px-4 py-2 mb-4">Add Medicine</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Medicine Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Type</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Strength</th>
            <th className="py-2">Expire Date</th>
            <th className="py-2">Price of Sell</th>
            <th className="py-2">Price of Buy</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <tr key={`${medicine.med_id}-${medicine.category}-${medicine.type}-${medicine.brand}`}>
                <td className="border px-4 py-2">{medicine.medicine_name}</td>
                <td className="border px-4 py-2">{medicine.category}</td>
                <td className="border px-4 py-2">{medicine.type}</td>
                <td className="border px-4 py-2">{medicine.brand}</td>
                <td className="border px-4 py-2">{medicine.strength}</td>
                <td className="border px-4 py-2">{medicine.exp_date.split('T')[0]}</td>
                <td className="border px-4 py-2">{medicine.price_of_sell}</td>
                <td className="border px-4 py-2">{medicine.price_of_buy}</td>
                <td className="border px-4 py-2">{medicine.quantity}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditClick(medicine)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
                  <button onClick={() => handleDeleteClick(medicine.med_id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="10">No medicines available</td>
            </tr>
          )}
        </tbody>
      </table>

      {(formType === 'add' || formType === 'edit') && (
        <form onSubmit={handleFormSubmit} className="mt-4 p-4 border rounded bg-gray-100">
          <div className="mb-2">
            <label className="block mb-1">Medicine Name</label>
            <input type="text" name="medicine_name" value={formData.medicine_name} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Strength</label>
            <input type="text" name="strength" value={formData.strength} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Expire Date</label>
            <input type="date" name="exp_date" value={formData.exp_date} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Price of Sell</label>
            <input type="number" name="price_of_sell" value={formData.price_of_sell} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Price of Buy</label>
            <input type="number" name="price_of_buy" value={formData.price_of_buy} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-2 border" required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCancelClick} className="bg-gray-500 text-white px-4 py-2 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MedicineAdmin;
