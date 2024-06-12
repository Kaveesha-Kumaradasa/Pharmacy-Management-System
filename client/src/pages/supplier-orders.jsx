import  { useState, useEffect } from 'react';
import axios from 'axios';

const SupOrder = () => {
  const [orders, setOrders] = useState([]);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const loggedInSupplierId = localStorage.getItem('user_id');
    const userRoleId = localStorage.getItem('role_id');
    if (loggedInSupplierId && userRoleId === '3') {
      setSupplierId(loggedInSupplierId);
    } else {
      console.error('User is not a supplier or not logged in');
    }
  }, []);

  useEffect(() => {
    if (supplierId) {
      axios.get(`http://localhost:8800/server/orders/supplier/orders?supplier_id=${supplierId}`, {
        headers: {
          'user-id': supplierId,
          'role-id': '3',
        }
      })
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [supplierId]);

  const handleDeliveryStatus = (orderId) => {
    axios.put(`http://localhost:8800/server/orders/delivery/status`, { orderId, status: 'delivered' }, {
      headers: {
        'user-id': supplierId,
        'role-id': '3',
      }
    })
      .then(response => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.order_id === orderId ? { ...order, status: 'delivered' } : order
          )
        );
        console.log('Delivery status updated:', response.data);
      })
      .catch(error => console.error('Error updating delivery status:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>
      <h2 className="text-xl mb-4">Orders</h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="border p-4 rounded">
              <div><strong>Order ID:</strong> {order.order_id}</div>
              <div><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</div>
              <div><strong>Order Status:</strong> {order.status}</div>
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
              <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => handleDeliveryStatus(order.order_id)}>
                Mark as Delivered
              </button>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default SupOrder;
