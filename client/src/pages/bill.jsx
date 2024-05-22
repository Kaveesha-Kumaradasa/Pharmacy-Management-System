import  { useState } from 'react';
import axios from 'axios';

const Bill = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const searchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/server/billing/products', { params: { name: query } });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const addItem = async (product) => {
    const quantity = prompt('Enter quantity:');
    if (quantity) {
      const newItem = { ...product, quantity: parseInt(quantity), total: product.sell_price * quantity };
      setItems([...items, newItem]);
      setTotal(total + newItem.total);

      try {
        await axios.post('http://localhost:8800/server/billing/invoice', { product_id: product.id, quantity: parseInt(quantity) });
      } catch (error) {
        console.error('Error adding item to invoice:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Pharmacy Invoice System</h1>
      <div>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search product name" 
          className="border p-2"
        />
        <button onClick={searchProducts} className="bg-blue-500 text-white p-2 ml-2">Search</button>
        <div className="mt-4">
          {results.map(product => (
            <div key={product.id} className="p-2 border-b">
              {product.product_name} - RS{product.sell_price}
              <button 
                onClick={() => addItem(product)} 
                className="bg-green-500 text-white p-2 ml-2"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2>Invoice</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="py-2">{item.product_name}</td>
                <td className="py-2">RS{item.sell_price}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">RS{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h3>Total: RS{total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Bill;
