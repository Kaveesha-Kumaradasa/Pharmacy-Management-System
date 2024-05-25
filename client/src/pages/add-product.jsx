import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ onClose }) => {
  const [product, setProduct] = useState({
    product_name: '',
    exp_date: '',
    purchase_price: '',
    sell_price: '',
    quantity: '',
    generic_id: '',
    cat_id: '',
    type_id: '',
    brand_id: '',
    supplier_id: ''
  });

  const [generics, setGenerics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dosageTypes, setDosageTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genericRes, categoryRes, dosageTypeRes, brandRes, supplierRes] = await Promise.all([
          axios.get('http://localhost:8800/server/med-admin/product/generics'),
          axios.get('http://localhost:8800/server/med-admin/product/categories'),
          axios.get('http://localhost:8800/server/med-admin/product/dosage-types'),
          axios.get('http://localhost:8800/server/med-admin/product/brands'),
          axios.get('http://localhost:8800/server/med-admin/product/suppliers')
        ]);

        setGenerics(genericRes.data);
        setCategories(categoryRes.data);
        setDosageTypes(dosageTypeRes.data);
        setBrands(brandRes.data);
        setSuppliers(supplierRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/server/med-admin/product', product);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-auto">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Expiration Date</label>
          <input
            type="date"
            name="exp_date"
            value={product.exp_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Purchase Price</label>
          <input
            type="number"
            name="purchase_price"
            value={product.purchase_price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Sell Price</label>
          <input
            type="number"
            name="sell_price"
            value={product.sell_price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Generic</label>
          <select
            name="generic_id"
            value={product.generic_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Generic</option>
            {generics.map(generic => (
              <option key={generic.generic_id} value={generic.generic_id}>{generic.generic_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="cat_id"
            value={product.cat_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.cat_id} value={category.cat_id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Dosage Type</label>
          <select
            name="type_id"
            value={product.type_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Dosage Type</option>
            {dosageTypes.map(dosageType => (
              <option key={dosageType.type_id} value={dosageType.type_id}>{dosageType.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Brand</label>
          <select
            name="brand_id"
            value={product.brand_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand.brand_id} value={brand.brand_id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Supplier</label>
          <select
            name="supplier_id"
            value={product.supplier_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier=> (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>{supplier.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
      </form>
    </div>
  );
};

AddProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddProduct;
