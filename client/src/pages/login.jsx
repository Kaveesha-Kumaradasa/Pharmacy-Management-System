import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import logo from '../assets/pharmacy.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/server/auth/login', { username, password })
      .then(res => {
        console.log('Login successful:', res.data);
        // Store the JWT token in local storage or cookies
        localStorage.setItem('token', res.data.token);
        // Redirect to a different page after login
        navigate('/dashboard');
      })
      .catch(err => console.error('Login error:', err));
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto mt-6 mb-4" />
          <p className="text-xs font-bold text-gray-900 mb-6">Nirogya Pharmacy</p>
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-left text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text" // Change this to "text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <Link to="/pages/register" className="block mt-6 font-semibold leading-10 text-sky-600 hover:text-sky-500">
          SignUp to Login
        </Link>
      </div>
    </div>
  );
}
