// OrdersAdmin.jsx
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

    console.log('User ID:', userId);
    console.log('Role ID:', roleId);

    axios.get('http://localhost:8800/server/orders/admin/orders', {
      headers: {
        'user-id': userId,
        'role-id': roleId
      }
    })
      .then(response => {
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        console.log('Full error response:', error.response); // Log full error response for debugging
      });
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
        console.log('Delivery status updated:', response.data);
        fetchOrders(); // Refresh orders to show the updated status
      })
      .catch(error => console.error('Error updating delivery status:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Interface - Pharmacy Management System</h1>
      <div className="mb-4">
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

      <h2 className="text-xl mt-8">Orders</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersAdmin;
