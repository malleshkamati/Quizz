import React from 'react';
import { useNavigate } from 'react-router-dom';
import quiz_photo from 'C:/Users/lenovo/OneDrive/Desktop/React_js/08_quiz/src/assets/Quiz_solve.jpg';
const LandingPage = () => {
  const admin_navigate = useNavigate()
  const user_navigate=useNavigate()
  let isAdmin=localStorage.getItem('isAdmin')
  isAdmin=JSON.parse(isAdmin)
  const getstarted=()=>{
      if (isAdmin){
        admin_navigate('/take_quiz');
      }else{
        user_navigate('/give_quiz')
      }
      
    }
  
  return (
    // <div className="landing-page min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
    //   <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
    //     <h1 className="text-4xl font-bold text-center mb-6">Welcome to the Quiz App!</h1>
    //     <p className="text-lg text-center mb-6">Test your knowledge and have fun with our interactive quizzes. Challenge yourself on a variety of topics and see how much you know!</p>
    //     <div className="flex justify-center">
          // <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"onClick={getstarted}>
          //   Get Started
          // </button >
    //     </div>
    //   </div>
    //   <div>
        
    //   </div>
    // </div>
    <>
    <div className='container flex pt-40 -mb-40 bg-gray-300'>
      <div className='left w-2/3 pl-10' >
        <p className='text-6xl font-bold mt-3 pl-10'>Test your knowledge</p>
        <p className='text-6xl font-bold mt-3 pl-10'> unlock your potential!</p>
        <p className='text-2xl pl-10 mt-16'>Test your knowledge and have fun with our interactive quizzes. </p>
        <p className='text-2xl pl-10'>Challenge yourself on a variety of topics and see how much you know!</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-10 m-10"onClick={getstarted}>
            Get Started
          </button >

      </div>
      <div className='right h-screen '>
        
      <img src={quiz_photo} alt="Ready for quiz" className="h-1/2 rounded-3xl" />

      </div>
    </div>
    </>
  );
};

export default LandingPage;
