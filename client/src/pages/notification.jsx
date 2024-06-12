import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io.connect('http://localhost:8800'); // Update with your server URL

export default function Notification({ onNewNotification }) {
  const [items, setItems] = useState([]);
  const itemsRef = useRef(items);
  const [newNotifications, setNewNotifications] = useState(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/server/notification/items");

        const itemsWithMessage = response.data.map(item => {
          let message = '';
          const currentDate = new Date();
          const expireDate = new Date(item.exp_date);

          const diffInTime = expireDate.getTime() - currentDate.getTime();
          const diffInDays = diffInTime / (1000 * 3600 * 24);

          if (diffInDays <= 90) {
            message = 'Expire date is close';
          } else if (['tablets', 'capsules'].includes(item.dosage_type) && item.quantity < 100) {
            message = 'Less stock';
          } else if (item.quantity < 15) {
            message = 'Less stock';
          } else if (item.quantity === 0) {
            message = 'Empty stock';
          }

          return { ...item, message };
        });

        setItems(itemsWithMessage.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
        setNewNotifications(true);
        onNewNotification(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const handleNewNotification = (newItem) => {
      const itemsWithMessage = newItem.map(item => {
        let message = '';
        const currentDate = new Date();
        const expireDate = new Date(item.exp_date);

        const diffInTime = expireDate.getTime() - currentDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        if (diffInDays <= 90) {
          message = 'Expire date is close';
        } else if (['tablets', 'capsules'].includes(item.dosage_type) && item.quantity < 100) {
          message = 'Less stock';
        } else if (item.quantity < 15) {
          message = 'Less stock';
        } else if (item.quantity === 0) {
          message = 'Empty stock';
        }

        return { ...item, message };
      });

      setItems(prevItems => [ ...itemsWithMessage, ...prevItems].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
      setNewNotifications(true);
      onNewNotification(true);
    };

    socket.on('new_notification', handleNewNotification);

    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.disconnect();
    };
  }, [onNewNotification]);

  return (
    <div className='notification p-6'>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Notification Items {newNotifications}
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-xl">No items found matching the criteria.</p>
      ) : (
        <div className='container mx-auto'>
          <table className='table-auto w-full '>
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Batch No</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Expiry Date</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Message</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                let messageColor = '';

                if (item.message === 'Empty stock') {
                  messageColor = 'text-red-500';
                } else if (item.message === 'Less stock') {
                  messageColor = 'text-red-500';
                } else {
                  messageColor = 'text-black-500';
                }

                const { batch_number, product_name, exp_date, quantity, message } = item;
                return (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border">{batch_number}</td>
                    <td className="px-4 py-2 border">{product_name}</td>
                    <td className="px-4 py-2 border">{new Date(exp_date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{quantity}</td>
                    <td className={`px-4 py-2 border font-bold ${messageColor}`}>{message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

Notification.propTypes = {
    onNewNotification: PropTypes.func.isRequired,
};
