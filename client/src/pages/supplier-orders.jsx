import { useState, useEffect } from 'react';
import axios from 'axios';

const SupOrder = () => {
  const [orders, setOrders] = useState([]);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in supplier's ID and role from local storage
    const loggedInSupplierId = localStorage.getItem('user_id');
    const userRoleId = localStorage.getItem('role_id');
    console.log('Logged in supplier ID:', loggedInSupplierId);
    console.log('User role ID:', userRoleId);
    if (loggedInSupplierId && userRoleId === '3') { // 3 is the role_id for suppliers
      setSupplierId(loggedInSupplierId);
    } else {
      console.error('User is not a supplier or not logged in');
    }
  }, []);

  useEffect(() => {
    if (supplierId) {
      console.log(`Fetching orders for supplier ID: ${supplierId}`);
      axios.get(`http://localhost:8800/server/orders/orders?supplier_id=${supplierId}`, {
        headers: {
          'user-id': supplierId,
          'role-id': '3', // Ensure role_id is passed as a header
        }
      })
        .then(response => {
          console.log('Fetched orders:', response.data);
          setOrders(response.data);
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [supplierId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Supplier Interface - Pharmacy Management System</h1>
      <h2 className="text-xl mb-4">Orders</h2>
      <div className="grid grid-cols-1 gap-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="border p-4 rounded">
              <div><strong>Order ID:</strong> {order.order_id}</div>
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
