import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/pharmacy.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/server/auth/login', { username, password });
      console.log('Login successful:', response.data);

      const { token, id, role_id } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user_id', id);
      localStorage.setItem('role_id', role_id);

      switch (role_id) {
        case 1:
          navigate('/admin/medicine-admin');
          break;
        case 2:
          navigate('/cashier/bill');
          break;
        case 3:
          navigate('/supplier/supplier-orders');
          break;
        default:
          navigate('/pages/login');
          break;
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <div className="font-sans flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto mt-6 mb-4" />
          <p className="text-xs font-bold text-gray-900 mb-6">Nirogya Pharmacy</p>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Sign in
              </button>
            </div>
          </form>
          {/*<div className="mt-6 text-center">
            <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
              SignUp to Login
            </Link>
  </div>*/}
        </div>
      </div>
    </div>
  );
}
