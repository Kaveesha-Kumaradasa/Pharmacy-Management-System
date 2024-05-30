import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/pharmacy.png';  // Make sure to import your logo

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Clear the token and other user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');

    // Redirect to the login page
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <React.Fragment>
      <section>
        <nav className="bg-sky-600 h-20 w-full flex items-center justify-between px-10 shadow-md">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
            <p className='text-white font-bold text-2xl'>Nirogya Pharmacy</p>
          </div>

          <div className='relative'>
            <div className='text-white font-semibold cursor-pointer flex items-center gap-x-2 hover:text-gray-200' onClick={toggleDropdown}>
              <FaUserCircle size={24} />
              <span>User</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <div 
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </nav>
      </section>
    </React.Fragment>
  );
};

export default Navbar;
