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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8800/server/auth/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error(err));
  }, []);

  const validate = () => {
    let tempErrors = {};

    if (!values.name) tempErrors.name = "Name is required.";
    if (!values.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!values.phone_number) {
      tempErrors.phone_number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(values.phone_number)) {
      tempErrors.phone_number = "Phone number is invalid.";
    }
    if (!values.address) tempErrors.address = "Address is required.";
    if (!values.username) tempErrors.username = "Username is required.";
    if (!values.password) tempErrors.password = "Password is required.";
    if (!values.role_id) tempErrors.role_id = "Role is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      axios.post('http://localhost:8800/server/auth/register', values)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
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
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input type="tel" id="phone_number" name="phone_number" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.phone_number && <div className="text-red-500 text-sm">{errors.phone_number}</div>}
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
          <input type="text" id="address" name="address" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Preferred username</label>
          <input type="text" id="username" name="username" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-"/>
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
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
          {errors.role_id && <div className="text-red-500 text-sm">{errors.role_id}</div>}
        </div>
        <div>
          <button type="submit" className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign up</button>
        </div>
      </form>

      <Link to="/admin/users" className="block mt-6 font-semibold leading-10 text-sky-600 hover:text-sky-500">
        Back to user table
      </Link>
    </div>
  );
}

export default Register;
