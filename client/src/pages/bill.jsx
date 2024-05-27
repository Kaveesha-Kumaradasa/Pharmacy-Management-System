import  { useState } from 'react';
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
    const existingItemIndex = items.findIndex(item => item.product_id === product.product_id);
    if (existingItemIndex !== -1) {
      alert('Item already added');
      return;
    }

    const newItem = { ...product, quantity: 0, total: 0 };
    setItems([...items, newItem]);
  };

  const updateItemQuantity = (index, quantity) => {
    const newItems = [...items];
    const selectedProduct = newItems[index];

    if (quantity > selectedProduct.available_quantity) {
      alert('Quantity exceeds available stock');
      return;
    }

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

  const printInvoice = () => {
    const printableContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }
            .invoice-box table { width: 100%; line-height: inherit; text-align: left; }
            .invoice-box table td { padding: 5px; vertical-align: top; }
            .invoice-box table tr td:nth-child(2) { text-align: right; }
            .invoice-box table tr.top table td { padding-bottom: 20px; }
            .invoice-box table tr.information table td { padding-bottom: 40px; }
            .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; }
            .invoice-box table tr.details td { padding-bottom: 20px; }
            .invoice-box table tr.item td { border-bottom: 1px solid #eee; }
            .invoice-box table tr.item.last td { border-bottom: none; }
            .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <table>
              <tr class="top">
                <td colspan="4">
                  <table>
                    <tr>
                      <td class="title">
                        <h1>Nirogya Pharmacy</h1>
                      </td>
                      <td>
                        Invoice Date: ${invoiceDate}<br>
                        Customer: ${customerName}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="heading">
                <td>Product Name</td>
                <td>Quantity</td>
                <td>Sell Price (Rs)</td>
                <td>Total (Rs)</td>
              </tr>
              ${items.map(item => `
                <tr class="item">
                  <td>${item.product_name}</td>
                  <td>${item.quantity}</td>
                  <td>Rs ${item.sell_price}</td>
                  <td>Rs ${item.total}</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="3"></td>
                <td>Total: Rs ${total}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;
  
    const newWindow = window.open('', '_blank');
    newWindow.document.write(printableContent);
    newWindow.document.close();
    newWindow.print();
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
        <button
          onClick={searchProducts}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
      {results.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Sell Price</th>
                <th className="px-4 py-2">Available Quantity</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{product.product_name}</td>
                  <td className="border px-4 py-2">{product.sell_price}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => addItem(product)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Sell Price</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.product_name}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(index, parseInt(e.target.value))}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
                <td className="border px-4 py-2">{item.sell_price}</td>
                <td className="border px-4 py-2">{item.total}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
        <div>
          <button
            onClick={generateInvoice}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Generate Invoice
          </button>
          <button
            onClick={printInvoice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
