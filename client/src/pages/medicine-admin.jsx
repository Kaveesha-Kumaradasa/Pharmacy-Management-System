import { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductForm from './edit-product.jsx';
import AddProduct from './add-product.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/server/med-admin/product');
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Product
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Product ID</th>
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Expiration Date</th>
            <th className="py-2 px-4 border">Purchase Price</th>
            <th className="py-2 px-4 border">Sell Price</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Generic Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Dosage Type</th>
            <th className="py-2 px-4 border">Brand</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td className="py-2 px-4 border">{product.product_id}</td>
              <td className="py-2 px-4 border">{product.product_name}</td>
              <td className="py-2 px-4 border">{product.exp_date}</td>
              <td className="py-2 px-4 border">{product.purchase_price}</td>
              <td className="py-2 px-4 border">{product.sell_price}</td>
              <td className="py-2 px-4 border">{product.quantity}</td>
              <td className="py-2 px-4 border">{product.generic_name}</td>
              <td className="py-2 px-4 border">{product.category}</td>
              <td className="py-2 px-4 border">{product.dosage_type}</td>
              <td className="py-2 px-4 border">{product.brand}</td>
              <td className="py-2 px-4 border">
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
