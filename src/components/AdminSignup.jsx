

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { response } from 'express';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
 
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    isadmin: false,
  });
  const navigate = useNavigate();
  const [err,setErr]=useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  
  formData.isadmin=true

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/signup', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User registered successfully', response.data);
      navigate('/home'); // Redirect after successful signup
      localStorage.setItem('isAdmin', true),
      localStorage.setItem('email',formData.username),
      localStorage.setItem('password',formData.password)
    } catch (error) {
      console.error('Error registering user', error);
      setErr('user email  already exists')
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
    }
  };
  


  

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26c.4.27.9.27 1.3 0L21 8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign in as admin</h2>
        <form onSubmit={handleSubmit}>
        {/* <form > */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700" >
             Email
            </label>
            <input
            placeholder='abcd@gmail.com'
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}

<div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"}  
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  
                onChange={handleChange} 
                value={formData.password} 
                required 
              />
              <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            {/* <label htmlFor="isadmin" className="flex items-center">
              <input
                type="checkbox"
                id="isadmin"
                name="isadmin"
                checked={formData.isadmin}
                onChange={handleChange}
                className="mr-2"
              />
              Admin
            </label> */}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in as admin
            </button>
          </div>
        </form>
        <div className='er text-red-500'>
              {err}
        </div>
      </div>
    </div>
  );
}

export default Signup;
