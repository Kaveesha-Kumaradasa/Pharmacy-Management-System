//import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pharmacy.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Nirogya Pharmacy</h1>
          </div>
          <div>
            <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900 mx-4">
              Sign In
            </Link>
            <Link to="/register" className="text-base font-medium text-gray-500 hover:text-gray-900 mx-4">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase">Welcome</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Health, Our Priority
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Nirogya Pharmacy is committed to providing you with the best healthcare services. Join us today and
              experience the difference.
            </p>
          </div>
          <div className="mt-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h3 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Our Services
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  We offer a wide range of services to cater to all your healthcare needs, including:
                </p>
                <ul className="mt-10">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-sky-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-700">Prescription Services</p>
                  </li>
                  <li className="flex mt-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-sky-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-700">Health and Wellness Products</p>
                  </li>
                  <li className="flex mt-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-sky-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-700">Online Consultations</p>
                  </li>
                </ul>
              </div>
              <div className="mt-10 lg:mt-0">
                <img
                  className="rounded-lg shadow-lg object-cover object-center h-96 w-full"
                  src="https://images.unsplash.com/photo-1507764923504-cd90bf7da772"
                  alt="Healthcare"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 Nirogya Pharmacy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
