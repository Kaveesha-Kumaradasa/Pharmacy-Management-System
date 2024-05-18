// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bill = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/medicines')
      .then(response => {
        setMedicines(response.data);
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
      });
  }, []);

  const handleAddMedicine = (medicine) => {
    setSelectedMedicines(prev => [...prev, medicine]);
    setTotal(prev => prev + medicine.price);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing Interface</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        {filteredMedicines.map(medicine => (
          <div key={medicine.id} className="flex justify-between items-center p-2 border-b">
            <span>{medicine.name}</span>
            <button
              onClick={() => handleAddMedicine(medicine)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Selected Medicines</h2>
      <ul>
        {selectedMedicines.map((medicine, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{medicine.name}</span>
            <span>${medicine.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-xl font-bold">
        Total: ${total}
      </div>
    </div>
  );
};

export default Bill;
