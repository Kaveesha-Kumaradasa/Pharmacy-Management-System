import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditProductForm = ({ product_id, onClose, fetchProducts }) => {
  const [product, setProduct] = useState({
    exp_date: '',
    purchase_price: '',
    sell_price: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/server/med-admin/product/${product_id}`);
        const { exp_date, purchase_price, sell_price, quantity } = response.data;
        console.log('Fetched product data:', response.data); // Log the entire response
        const formattedDate = exp_date ? new Date(exp_date).toISOString().split('T')[0] : '';
        setProduct({ exp_date: formattedDate, purchase_price, sell_price, quantity });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [product_id]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/server/med-admin/product/${product_id}`, product);
      fetchProducts();
      onClose();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
        <input
          type="date"
          name="exp_date"
          value={product.exp_date}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
        <input
          type="number"
          name="purchase_price"
          value={product.purchase_price}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sell Price</label>
        <input
          type="number"
          name="sell_price"
          value={product.sell_price}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
};

EditProductForm.propTypes = {
  product_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

export default EditProductForm;
