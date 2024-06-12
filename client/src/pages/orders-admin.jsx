import { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersAdmin = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/server/orders/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      axios.get(`http://localhost:8800/server/orders/products?supplier_id=${selectedSupplier}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [selectedSupplier]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const userId = localStorage.getItem('user_id');
    const roleId = localStorage.getItem('role_id');

    axios.get('http://localhost:8800/server/orders/admin/orders', {
      headers: {
        'user-id': userId,
        'role-id': roleId
      }
    })
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  };

  const handleQuantityChange = (productId, quantity) => {
    setOrderItems(prevOrderItems => {
      const itemIndex = prevOrderItems.findIndex(item => item.productId === productId);
      if (itemIndex !== -1) {
        const updatedOrderItems = [...prevOrderItems];
        updatedOrderItems[itemIndex].quantity = quantity;
        return updatedOrderItems;
      } else {
        return [...prevOrderItems, { productId, quantity }];
      }
    });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8800/server/orders/orders', { supplierId: selectedSupplier, products: orderItems })
      .then(response => {
        if (response.data.message) {
          alert(response.data.message);
          fetchOrders();
        } else {
          console.error('Unexpected response from server:', response);
        }
      })
      .catch(error => console.error('Error sending order:', error));
  };

  const handleDeliveryStatus = (orderId) => {
    axios.put(`http://localhost:8800/server/orders/delivery/status`, { orderId, status: 'delivered' })
      .then(response => {
        fetchOrders();
        console.log(response.data);
      })
      .catch(error => console.error('Error updating delivery status:', error));
  };

  const printOrderDetails = (order) => {
    const printableContent = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #f7f7f7;
              padding: 20px;
            }
  
            .container {
              max-width: 800px;
              margin: auto;
              background-color: #fff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
  
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
  
            .header p {
              margin: 0;
              font-size: 16px;
              color: #333;
            }
  
            .title {
              font-size: 24px;
              font-weight: 700;
              color: #333;
              margin-bottom: 20px;
              text-align: center;
            }
  
            .subtitle {
              font-size: 16px;
              font-weight: 500;
              color: #666;
              margin-bottom: 10px;
            }
  
            .order-details, .product-list {
              margin-bottom: 20px;
            }
  
            .product-item {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
  
            .product-name {
              font-weight: bold;
            }
  
            .footer {
              text-align: center;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p><strong>NIROGYA PHARMACY</strong></p>
              <p>NO:83 MEENNANA, GETAHETTA</p>
              <p>TEL: 077 2515537</p>
            </div>
            <div class="title">Order Details</div>
            <div class="order-details">
              <div class="subtitle">Order ID:
              ${order.order_id}
              <div class="subtitle">Supplier Name:
              ${order.supplier_name}
              <div class="subtitle">Order Date:
              ${new Date(order.date).toLocaleString()}
            </div>
            <div class="product-list">
              <div class="subtitle">Products:</div>
              ${order.products.map(product => `
                <div class="product-item">
                  <div class="product-name">${product.product_name}</div>
                  <div>Quantity: ${product.quantity}</div>
                </div>
              `).join('')}
            </div>
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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>
      <div className="mb-4">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Create an Orders</h3>
        <label className="block mb-2">Select Supplier</label>
        <select
          onChange={e => setSelectedSupplier(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.user_id} value={supplier.user_id}>{supplier.name}</option>
          ))}
        </select>
      </div>
      {selectedSupplier && (
        <div>
          <h2 className="text-xl mb-4">Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <div key={product.product_id} className="border p-4 rounded">
                <div className="mb-2">{product.product_name}</div>
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  onChange={e => handleQuantityChange(product.product_id, e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Send Order
          </button>
        </div>
      )}

<h3 className="text-3xl font-bold mb-6 text-gray-800">Orders</h3>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {orders.map(order => (
          <div key={order.order_id} className="border p-4 rounded">
            <div><strong>Order ID:</strong> {order.order_id}</div>
            <div><strong>Supplier Name:</strong> {order.supplier_name}</div>
            <div><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</div>
            <div><strong>Order Status:</strong> {order.status}</div>
            {order.status && <div><strong>Delivery Status:</strong> {order.status}</div>} {/* Display delivery status if available */}
            <div>
              <strong>Products:</strong>
              <ul>
                {order.products.map(product => (
                  <li key={product.product_id}>
                    {product.product_name} - Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
            {order.status !== 'delivered' && (
              <button
                onClick={() => handleDeliveryStatus(order.order_id)}
                className="mt-2 p-2 bg-green-500 text-white rounded"
              >
                Mark as Delivered
              </button>
            )}
            <button
              onClick={() => printOrderDetails(order)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Print Order Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersAdmin;
