import { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Address</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone Number</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="text-left py-3 px-4">{user.name}</td>
                            <td className="text-left py-3 px-4">{user.address}</td>
                            <td className="text-left py-3 px-4">{user.email}</td>
                            <td className="text-left py-3 px-4">{user.phone_number}</td>
                            <td className="text-left py-3 px-4">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
