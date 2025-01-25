
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import logo from '../assets/logo.jpeg'
// import { Outlet } from 'react-router-dom'

// function Navbar() {
//   const navigate = useNavigate()
//   const [user, setUser] = useState(null)
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   let isAdmin = localStorage.getItem('isAdmin');
//   isAdmin = JSON.parse(isAdmin) ?? false;

//   const handleLogout = () => {
//     localStorage.removeItem('isAdmin')
//     localStorage.clear() 
//     navigate('/')
//   }

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen)
//   }

//   return (
//     <>
//       <nav>
//         <ul className="flex justify-end bg-blue-200 text-white font-bold h-20 ">
//           <li className="mt-6">
//             <img src={logo} alt="logo" className="h-12 w-12 rounded-full"/>
//           </li>
//           <li className="mt-6 mr-96 text-4xl text-amber-950 font-extrabold pr-20 pl-2 font-serif">
//             Quizz
//           </li>
//           <li className="m-8">
//             <Link to="/home">Home</Link>
//           </li>
//           <li className="m-8">
//             <Link to="/about">About us</Link>
//           </li>
//           {/* <li className="m-8">
//             <Link to="/myquiz">My quiz</Link>
//           </li> */}
//           {isAdmin && (
//             <>
//               <li className="m-8">
//                 <Link to="/take_quiz">Create Quiz</Link>
//               </li>
//               <li className="m-8">
//                 <Link to="/results">Results</Link>
//               </li>
//             </>
//           )}
//           <li className="m-8">
//             <Link to="/give_quiz">Test</Link>
//           </li>
//           <div className="relative m-8">
//             <button 
//               type="button" 
//               className="bg-blue-500 rounded-lg px-3 h-8"
//               onClick={toggleDropdown}
//             >
//               Account
//             </button>
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                 <button 
//                   type="button" 
//                   className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//                 <button
//                   type="button" 
//                   className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
//                   onClick={() => navigate('/profile')}
//                 >
//                   My Profile
//                 </button>
//                 {isAdmin &&<button
//                   type="button" 
//                   className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
//                   onClick={() => navigate('/myquiz')}
//                 >
//                   My Quizzes
//                 </button>}
//               </div>
//             )}
//           </div>
//         </ul>
//       </nav>
//     </>
//   )
// }

// export default Navbar
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let isAdmin = JSON.parse(localStorage.getItem('isAdmin')) ?? false;

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.clear();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
            <span className="text-2xl text-teal-100 font-extrabold ml-2 font-serif">Quizz</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/home" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium">About us</Link>
              <Link to="/give_quiz" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Test</Link>
              {isAdmin && (
                <>
                  <Link to="/take_quiz" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Create Quiz</Link>
                  <Link to="/results" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Results</Link>
                </>
              )}
              <div className="relative">
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-lg px-3 py-2"
                  onClick={toggleDropdown}
                >
                  Account
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                      onClick={() => navigate('/profile')}
                    >
                      My Profile
                    </button>
                    {isAdmin && (
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                        onClick={() => navigate('/myquiz')}
                      >
                        My Quizzes
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-300 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">About us</Link>
            <Link to="/give_quiz" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Test</Link>
            {isAdmin && (
              <>
                <Link to="/take_quiz" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Create Quiz</Link>
                <Link to="/results" className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Results</Link>
              </>
            )}
            <button
              type="button"
              className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={() => navigate('/profile')}
            >
              My Profile
            </button>
            {isAdmin && (
              <button
                type="button"
                className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                onClick={() => navigate('/myquiz')}
              >
                My Quizzes
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;