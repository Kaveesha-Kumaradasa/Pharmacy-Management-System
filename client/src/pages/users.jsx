import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get('http://localhost:8800/server/users/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleAddUser = () => {
        navigate('/register'); // Navigate to the registration page
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <button
                onClick={handleAddUser}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Add User
            </button>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Address</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone Number</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Password</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td className="text-left py-3 px-4">{user.name}</td>
                            <td className="text-left py-3 px-4">{user.address}</td>
                            <td className="text-left py-3 px-4">{user.email}</td>
                            <td className="text-left py-3 px-4">{user.phone_number}</td>
                            <td className="text-left py-3 px-4">{user.role}</td>
                            <td className="text-left py-3 px-4">{user.username}</td>
                            <td className="text-left py-3 px-4">{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
