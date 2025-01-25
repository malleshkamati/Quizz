import { useState } from 'react';

import Quizform from './Quizform';
import Footer from './Footer';
import Navbar from './Navbar';

function TakeQuiz() {
  const [quizForms, setQuizForms] = useState([{ id: 0 }]);

  function addQuizForm() {
    setQuizForms(prevQuizForms => [
      ...prevQuizForms,
      { id: prevQuizForms.length }
    ]);
  }

  return (
    <>
  
    {/* <Navbar/> */}
      <div className="bg-gray-300 flex justify-center  min-h-screen">
        
        <div className='w-8/12 '>
          {quizForms.map((form, index) => (
            <Quizform 
              key={form.id} 
              que_num={index + 1} 
              addQuizForm={addQuizForm} 
            />
          ))}
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default TakeQuiz;

