import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    username: '',
    password: '',
    role_id: ''
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/server/auth/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/server/auth/register', values)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add users here
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input type="tel" id="phone_number" name="phone_number" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
          <input type="text" id="address" name="address" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Preferred username</label>
          <input type="text" id="username" name="username" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
        </div>
        <div>
          <label htmlFor="role_id" className="block text-gray-700 font-semibold mb-2">Role</label>
          <select
            id="role_id"
            name="role_id"
            onChange={handleChange}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role.role_id} value={role.role_id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign up</button>
        </div>
      </form>

      <Link to="/pages/login" className="block mt-6 font-semibold leading-10 text-sky-600 hover:text-sky-500">
        Click Here to Login
      </Link>
    </div>
  );
}

export default Register;
