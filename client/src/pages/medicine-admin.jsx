import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import EditProductForm from './edit-product.jsx';
import AddProduct from './add-product.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchField = '', searchQuery = '') => {
    try {
      const response = await axios.get('http://localhost:8800/server/med-admin/product', {
        params: { searchField, searchQuery },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const handleDelete = async (product_id) => {
    try {
      await axios.delete(`http://localhost:8800/server/med-admin/product/${product_id}`);
      setProducts(products.filter((product) => product.product_id !== product_id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product_id) => {
    setEditingProductId(product_id);
    fetchProducts(); // Refresh products after editing
  };

  const handleAddClick = () => {
    setShowAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
    fetchProducts(); // Refresh products after adding
  };

  const handleCloseEditProduct = () => {
    setEditingProductId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchProducts(searchField, event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    const newSearchField = event.target.value;
    setSearchField(newSearchField);
    fetchProducts(newSearchField, searchQuery);
  };

  return (
    <div className="p-4">
      {/*<h1 className="text-3xl font-bold mb-6 text-gray-800">Product List</h1>*/}
      <div className="flex justify-between mb-6">
        <div className="relative">
          <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-3 text-gray-400" />
          <select
            value={searchField}
            onChange={handleSearchFieldChange}
            className="border pl-10 pr-4 py-2 rounded shadow-sm focus:ring focus:outline-none"
          >
            <option value="all">All</option>
            <option value="product_name">Product Name</option>
            <option value="category">Category</option>
            <option value="generic_name">Generic Name</option>
            <option value="dosage_type">Dosage</option>
            <option value="brand">Brand</option>
            <option value="supplier">Supplier</option>
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
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-sm"
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Expiration Date</th>
              <th className="py-3 px-6 text-left">Purchase Price</th>
              <th className="py-3 px-6 text-left">Sell Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Generic Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Dosage Type</th>
              <th className="py-3 px-6 text-left">Brand</th>
              <th className="py-3 px-6 text-left">Supplier</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} className="hover:bg-gray-100">
                <td className="py-3 px-6 border-b">{product.product_name}</td>
                <td className="py-3 px-6 border-b">{product.exp_date.split('T')[0]}</td>
                <td className="py-3 px-6 border-b">Rs. {product.purchase_price}</td>
                <td className="py-3 px-6 border-b">Rs. {product.sell_price}</td>
                <td className="py-3 px-6 border-b">{product.quantity}</td>
                <td className="py-3 px-6 border-b">{product.generic_name}</td>
                <td className="py-3 px-6 border-b">{product.category}</td>
                <td className="py-3 px-6 border-b">{product.dosage_type}</td>
                <td className="py-3 px-6 border-b">{product.brand}</td>
                <td className="py-3 px-6 border-b">{product.supplier}</td>
                <td className="py-3 px-6 border-b">
                  <button
                    onClick={() => handleEditClick(product.product_id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.product_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-h-[80vh] overflow-auto">
            <EditProductForm
              product_id={String(editingProductId)}
              onClose={handleCloseEditProduct}
              fetchProducts={fetchProducts}
            />
          </div>
        </div>
      )}

      {showAddProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-h-[80vh] overflow-auto">
            <AddProduct onClose={handleCloseAddProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
