// import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Quizform from './components/Quizform'





// function App(props) {
//   const [que_num,set_que_num]=useState(0)
//   const [quizForms, setQuizForms] = useState([<Quizform key={0} addQuizForm={addQuizForm} />]);

//   function addQuizForm() {
//     setQuizForms(prevQuizForms => [
//       ...prevQuizForms,
//       <Quizform key={prevQuizForms.length} addQuizForm={addQuizForm} />
//     ]); 
//     set_que_num(prevQueNum => prevQueNum + 1);
//   }
//     // useEffect(addQuizForm,[que_num])
  
  
//   return (
//     <>
//     <div className="bg-gray-100 flex justify-center items-center min-h-screen ">
//      {/* <Quizform que_num={que_num} set_que_num={set_que_num} addQuizForm={addQuizForm}/>  */}
// {/*     
//      <div>{addQuizForm}</div> */}
//      <div>
//      {quizForms.map((key) => (
//         <Quizform key={key} que_num={key + 1} set_que_num={set_que_num} addQuizForm={addQuizForm} />
//       ))}
//       </div>
//      </div>
     
//     </>
//   )
// }

// export default App


import { useState } from 'react';
import './App.css';
import Quizform from './components/Quizform';
import TakeQuiz from './components/TakeQuiz';
import Signup from './components/Signup';
import Signin from './components/Signin';

function App() {

  const [quizForms, setQuizForms] = useState([{ id: 0 }]);

  function addQuizForm() {
    setQuizForms(prevQuizForms => [
      ...prevQuizForms,
      { id: prevQuizForms.length }
    ]);
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className='w-8/12'>
          {quizForms.map((form, index) => (
            <Quizform 
              key={form.id} 
              que_num={index + 1} 
              addQuizForm={addQuizForm} 
            />
          ))}
        </div>
      </div>
      <Signup/>
      <Signin/>
    </>

  );
}

export default App;

