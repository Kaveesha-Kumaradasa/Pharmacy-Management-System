import { useEffect, useState } from 'react';
import axios from 'axios';

const CashierMedTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:8800/server/med-cashier/medicines');
        setMedicines(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching medicines', error);
        setError('Error fetching medicines');
        setMedicines([]);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicine_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Inventory</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Medicine Name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-400 rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {['medicine_name', 'rack_no', 'category', 'brand', 'strength', 'type', 'exp_date', 'price_of_sell', 'price_of_buy', 'quantity'].map(key => (
              <th key={key} className="py-2">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{medicine.medicine_name || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.rack_no || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.category || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.brand || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.strength || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.type || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.exp_date.split('T')[0] || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.price_of_sell || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.price_of_buy || 'N/A'}</td>
                <td className="border px-4 py-2">{medicine.quantity || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="10">No medicines available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CashierMedTable;
