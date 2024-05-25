import { useState } from 'react';
import axios from 'axios';

const Bill = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);

  const searchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/server/billing/products', { params: { name: query } });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const addItem = (product) => {
    const newItem = { ...product, quantity: 0, total: 0 };
    setItems([...items, newItem]);
  };

  const updateItemQuantity = (index, quantity) => {
    const newItems = [...items];
    newItems[index].quantity = quantity;
    newItems[index].total = newItems[index].sell_price * quantity;
    setItems(newItems);
    setTotal(newItems.reduce((sum, item) => sum + item.total, 0));
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setTotal(newItems.reduce((sum, item) => sum + item.total, 0));
    setItems(newItems);
  };

  const generateInvoice = async () => {
    const billDetails = {
      date: invoiceDate,
      bill_total: total,
      customer_name: customerName,
      user_id: 1, // Replace with the actual user ID
      products: items
    };

    try {
      const response = await axios.post('http://localhost:8800/server/billing/bills', billDetails);
      console.log(response.data);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Invoice</h1>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Invoice Date</label>
        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search product name"
          className="shadow border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button onClick={searchProducts} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>
      </div>
      <div className="mb-6">
        {results.map(product => (
          <div
            key={product.id}
            className="flex justify-between items-center p-3 border-b hover:bg-gray-100"
            onClick={() => addItem(product)}
          >
            <span className="text-gray-800">{product.product_name}</span>
            <span className="font-semibold">Rs {product.sell_price}</span>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Invoice Items</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Unit Price</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-3 px-4">{item.product_name}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const quantity = parseInt(e.target.value, 10);
                      updateItemQuantity(index, quantity);
                    }}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
                <td className="py-3 px-4">Rs {item.sell_price}</td>
                <td className="py-3 px-4">Rs {item.total}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-bold text-gray-800">Total Amount: Rs {total.toFixed(2)}</h3>
        <div>
          <button onClick={generateInvoice} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
            Generate Invoice
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;