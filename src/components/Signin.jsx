import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signin() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const res = await axios.post('http://localhost:5000/signin', {
                username: email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.status === 200) {
                const data = res.data;
                localStorage.setItem('email',email),
                localStorage.setItem('password',password)
                if (data.user.isadmin) {
                    localStorage.setItem('isAdmin', true),
                    localStorage.setItem('email',email),
                    localStorage.setItem('password',password)
                    navigate('/home');
                } else {
                    localStorage.setItem('isAdmin', false)
                    navigate('/home');
                }
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26c.4.27.9.27 1.3 0L21 8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="email" id="email"  name="email" ref={emailRef} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  placeholder='abcd@gmail.com'/>
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" ref={passwordRef} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div> */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className='relative'>
                                <input type={showPassword ? "text" : "password"} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ref={passwordRef} />
                                <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                    </div>
                    <div className="flex items-center justify-between mb-6"></div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Login
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 mt-4">Please enter correct username or password</div>}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Sign up</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div>
                            <button id="signupUser" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => navigate('/signup')}>
                                Sign Up as User
                            </button>
                        </div>
                        <div>
                            <button id="signupAdmin" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => navigate('/AdminSignup')}>
                                Sign Up as Admin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
