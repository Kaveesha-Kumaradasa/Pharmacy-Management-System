import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('all');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async (searchField = '', searchQuery = '') => {
    try {
      const response = await axios.get('http://localhost:8800/server/suppliers', {
        params: { searchField, searchQuery },
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchSuppliers(searchField, event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    const newSearchField = event.target.value;
    setSearchField(newSearchField);
    fetchSuppliers(newSearchField, searchQuery);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Supplier List</h1>
      <div className="flex justify-between mb-6">
        <div className="relative">
          <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-3 text-gray-400" />
          <select
            value={searchField}
            onChange={handleSearchFieldChange}
            className="border pl-10 pr-4 py-2 rounded shadow-sm focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone_number">Phone Number</option>
            <option value="address">Address</option>
          </select>
        </div>
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search by ${searchField.replace('_', ' ')}`}
            className="border pl-10 pr-4 py-2 rounded shadow-sm focus:ring focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.user_id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{supplier.name}</td>
                <td className="py-3 px-6 border-b">{supplier.email}</td>
                <td className="py-3 px-6 border-b">{supplier.phone_number}</td>
                <td className="py-3 px-6 border-b">{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierList;
