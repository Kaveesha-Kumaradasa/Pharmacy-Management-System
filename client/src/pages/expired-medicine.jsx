// src/pages/ExpiredMedicine.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function ExpiredMedicine() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/server/expired-med');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expired Medicine</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Supplier Name</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Expiration Date</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Brand</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_name}>
              <td className="py-2 px-4 border-b">{product.supplier}</td>
              <td className="py-2 px-4 border-b">{product.product_name}</td>
              <td className="py-2 px-4 border-b">{product.exp_date}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpiredMedicine;
