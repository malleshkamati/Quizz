// import * as React from 'react'
// import * as ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from 'react-router-dom'
// import Signup from './components/Signup.jsx'
// import TakeQuiz from './components/TakeQuiz.jsx'
// import Signin from './components/Signin.jsx'
// import AdminSignup from './components/AdminSignup.jsx'
// import Givequiz from './components/Givequiz.jsx'
// import Navbar from './components/Navbar.jsx'
// import Exam from './components/Exam.jsx'
// import Home from './components/Home.jsx'
// import { Outlet } from 'react-router-dom'
// import About from './components/About.jsx'
// import Results from './components/Results.jsx'
// import Footer from './components/Footer.jsx'
// import LandingPage from './components/Landing.jsx'
// // const router=createBrowserRouter([
// //   {path:"/",
// //   //  element:<Signin/>,
// //   // element:<Exam/>,
// //    element:<Home/>
// //   },
// //   {
// //     path:"take_quiz",
// //     element:<TakeQuiz/>,
// //    },
// //    {
// //     path:"signup",
// //     element:<Signup/>,
// //    },
// //   //  {
// //   //  path:"take_quiz",
// //   //  element:<TakeQuiz/>,
// //   // },
// //   {
// //     path:'AdminSignup',
// //     element:<AdminSignup/>
// //   },
// //   {
// //     path:'AdminSignup/take_quiz',
// //     element:<TakeQuiz/>
// //   },
// //   {
// //     path:'signup/take_quiz',
// //     element:<TakeQuiz/>
// //   },



// // ]);


// const router = createBrowserRouter([
//   {

    
//     path: "/",
//     element: (
//       <>
//         <Navbar />
//         <Outlet />
//         <Footer/>
//       </>
//     ),
//     children: [
//       { index: true, element: <Signin/> },
//       { path:'home', element: <LandingPage/> },
//       { path: "about", element: <About/> },
//       { path: "take_quiz", element: <TakeQuiz /> },
//       { path: "give_quiz", element: <Givequiz /> },
//       { path: "results", element: <Results/>},
//       { path: "signup", element: <Signup /> },
//       { path: 'AdminSignup', element: <AdminSignup /> },
//       { path: 'signin', element: <Signin /> },
//       {path:'AdminSignup/home',element:<LandingPage/> }
//     ],
//   },
// ]);















// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//    <RouterProvider router={router}/>
   
  
    
//   </React.StrictMode>,
// )





import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import TakeQuiz from './components/TakeQuiz.jsx';
import Signin from './components/Signin.jsx';
import AdminSignup from './components/AdminSignup.jsx';
import Givequiz from './components/Givequiz.jsx';
import Navbar from './components/Navbar.jsx';
import Exam from './components/Exam.jsx';
import Home from './components/Home.jsx';
import { Outlet } from 'react-router-dom';
import About from './components/About.jsx';
import Results from './components/Results.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './components/Landing.jsx';
import Profile from './components/Profile.jsx';
import Myquiz from './components/Myquiz.jsx';
import EditQuiz from './components/EditQuiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signin />,
  },
  {
    path:'AdminSignup',
    element:<AdminSignup/>
  },
  { path: 'signup', element: <Signup /> },
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: 'home', element: <LandingPage /> },
      { path: 'about', element: <About /> },
      { path: 'take_quiz', element: <TakeQuiz /> },
      { path: 'give_quiz', element: <Home/> },
      { path: 'results', element: <Results /> },
      
      { path: 'AdminSignup', element: <AdminSignup /> },
      { path: 'signin', element: <Signin /> },
      { path: 'AdminSignup/home', element: <LandingPage /> },
      { path: 'profile', element: <Profile/> },
      { path: 'myquiz', element: <Myquiz/> },
      {path:"/edit_quiz/:id", element:<EditQuiz/>},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
