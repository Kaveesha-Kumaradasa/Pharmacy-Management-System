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
      // Filter results to only include products whose name starts with the query
      const filteredResults = response.data.filter(product =>
        product.product_name.toLowerCase().startsWith(query.toLowerCase())
      );
      setResults(filteredResults);
      setQuery(''); // Clear the search query after search
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

    if (product.available_quantity <= 0) {
      alert('Product is out of stock');
      return;
    }

    const newItem = { ...product, quantity: 1, total: parseFloat(product.sell_price).toFixed(2) };
    setItems([...items, newItem]);
    setTotal(parseFloat(total + parseFloat(newItem.total)).toFixed(2));
    setResults([]); // Clear search results after adding an item
  };

  const updateItemQuantity = (index, quantity) => {
    const newItems = [...items];
    const selectedProduct = newItems[index];

    if (quantity > selectedProduct.available_quantity) {
      alert('Quantity exceeds available stock');
      return;
    }

    newItems[index].quantity = quantity;
    newItems[index].total = (newItems[index].sell_price * quantity).toFixed(2);
    setItems(newItems);
    setTotal(newItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2));
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setTotal(newItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2));
    setItems(newItems);
  };

  const generateInvoice = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
    const userId = decodedToken.id;

    const billDetails = {
      date: invoiceDate,
      bill_total: total,
      customer_name: customerName,
      user_id: userId, // Use the user ID from the decoded token
      products: items
    };

    try {
      const response = await axios.post('http://localhost:8800/server/billing/bills', billDetails);
      console.log(response.data);
      const cashierName = response.data.cashier_name;

      // Call printInvoice with the cashier's name
      printInvoice(cashierName);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const printInvoice = (cashierName) => {
    const printableContent = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #f7f7f7;
            }
  
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border-radius: 10px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
            }
  
            .invoice-box table td {
              padding: 10px;
              vertical-align: top;
            }
  
            .invoice-box table tr td:nth-child(2) {
              text-align: right;
            }
  
            .invoice-box table tr.top table td {
              padding-bottom: 20px;
            }
  
            .invoice-box table tr.information table td {
              padding-bottom: 40px;
            }
  
            .invoice-box table tr.heading td {
              background-color: #f7f7f7;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
              text-transform: uppercase;
            }
  
            .invoice-box table tr.details td {
              padding-bottom: 20px;
            }
  
            .invoice-box table tr.item td {
              border-bottom: 1px solid #eee;
            }
  
            .invoice-box table tr.item.last td {
              border-bottom: none;
            }
  
            .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
  
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #333;
            }
  
            .subtitle {
              font-size: 16px;
              font-weight: 500;
              color: #666;
            }
  
            .pharmacy-info {
              text-align: center;
              margin-bottom: 20px;
            }
  
            .pharmacy-info p {
              margin: 0;
              font-size: 16px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="pharmacy-info">
              <p><strong>Nirogya Pharmacy</strong></p>
              <p>NO:83 MEENNANA, GETAHETTA</p>
              <p>TEL: 077 2515537</p>
            </div>
            <table>
              <tr class="top">
                <td colspan="4">
                  <table>
                    <tr>
                      <td class="title">
                        <h1>Invoice</h1>
                      </td>
                      <td>
                        <div class="subtitle">Invoice Date: ${invoiceDate}</div>
                        <div class="subtitle">Customer: ${customerName}</div>
                        <div class="subtitle">Cashier: ${cashierName}</div>
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
                  <td>Rs ${parseFloat(item.sell_price).toFixed(2)}</td>
                  <td>Rs ${parseFloat(item.total).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="3"></td>
                <td>Total: Rs ${parseFloat(total).toFixed(2)}</td>
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
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
        >
          Search
        </button>
      </div>
      <div>
        {results.map((product) => (
          <div key={product.product_id} className="border-b py-2 flex justify-between">
            <span>{product.product_name} - Rs {parseFloat(product.sell_price).toFixed(2)} - {product.available_quantity} in stock</span>
            <button
              onClick={() => addItem(product)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Selected Products</h2>
        {items.map((item, index) => (
          <div key={index} className="border-b py-2 flex justify-between items-center">
            <span>{item.product_name}</span>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max={item.available_quantity}
                value={item.quantity}
                onChange={(e) => updateItemQuantity(index, parseInt(e.target.value))}
                className="shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="ml-4">Rs {parseFloat(item.total).toFixed(2)}</span>
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end items-center mt-4">
          <h2 className="text-xl font-bold text-gray-800">Total: Rs {parseFloat(total).toFixed(2)}</h2>
        </div>
      </div>
      <button
        onClick={generateInvoice}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default Bill;