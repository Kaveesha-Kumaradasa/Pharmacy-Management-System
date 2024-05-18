import { useEffect, useState } from 'react';
import axios from 'axios';

const Supplier= () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the suppliers!', error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone Number
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {suppliers.map((supplier) => (
                                        <tr key={supplier.email}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.address}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Supplier;
