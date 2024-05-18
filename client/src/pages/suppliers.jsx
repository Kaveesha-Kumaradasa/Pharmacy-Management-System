import { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/server/suppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Supplier List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left border-r border-gray-300">Name</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Email</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Phone Number</th>
              <th className="py-3 px-6 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-6 border-r border-gray-300">{supplier.name}</td>
                <td className="py-3 px-6 border-r border-gray-300">{supplier.email}</td>
                <td className="py-3 px-6 border-r border-gray-300">{supplier.phone_number}</td>
                <td className="py-3 px-6">{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierList;
