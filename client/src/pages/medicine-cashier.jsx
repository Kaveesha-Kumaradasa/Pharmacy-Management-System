import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const CashierList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('product_name');
  const [drugType, setDrugType] = useState(''); // Add state for drugType

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchField = 'product_name', searchQuery = '', drugType = '') => {
    try {
      const response = await axios.get('http://localhost:8800/server/med-cashier/product', {
        params: { searchField, searchQuery, drugType },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchProducts(searchField, event.target.value, drugType);
  };

  const handleSearchFieldChange = (event) => {
    const newSearchField = event.target.value;
    setSearchField(newSearchField);
    fetchProducts(newSearchField, searchQuery, drugType);
  };

  const handleDrugTypeChange = (event) => {
    const newDrugType = event.target.value;
    setDrugType(newDrugType);
    fetchProducts(searchField, searchQuery, newDrugType);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product List</h1>
      <div className="flex justify-between mb-6">
        <div className="relative">
          <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-3 text-gray-400" />
          <select
            value={searchField}
            onChange={handleSearchFieldChange}
            className="border pl-10 pr-4 py-2 rounded shadow-sm focus:ring focus:outline-none"
          >
            <option value="product_name">Product Name</option>
            <option value="generic_name">Generic Name</option>
            <option value="brand">Brand</option>
          </select>
        </div>
        <div className="relative">
          <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-3 text-gray-400" />
          <select
            value={drugType}
            onChange={handleDrugTypeChange}
            className="border pl-10 pr-4 py-2 rounded shadow-sm focus:ring focus:outline-none"
          >
            <option value="">All Drug Types</option>
            <option value="Prescription">Prescription</option>
            <option value="Over-The-Counter">Over-The-Counter</option>
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
              <th className="py-3 px-6 text-left">Batch No</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Expiration Date</th>
              <th className="py-3 px-6 text-left">Sell Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Generic Name</th>
              <th className="py-3 px-6 text-left">Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.batch_number} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{product.batch_number}</td>
                <td className="py-3 px-6 border-b">{product.product_name}</td>
                <td className="py-3 px-6 border-b">{product.exp_date.split('T')[0]}</td>
                <td className="py-3 px-6 border-b">Rs. {product.sell_price}</td>
                <td className="py-3 px-6 border-b">{product.quantity}</td>
                <td className="py-3 px-6 border-b">{product.generic_name}</td>
                <td className="py-3 px-6 border-b">{product.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashierList;
