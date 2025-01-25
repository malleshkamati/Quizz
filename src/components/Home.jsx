


// import React, { useRef, useState } from 'react'
// import Ready from 'C:/Users/lenovo/OneDrive/Desktop/React_js/08_quiz/src/assets/ready.png'
// import GiveQuiz from './FormId'

// function Home() {
//   const name = useRef();
//   const quiz_id_ref = useRef();
//   const [show, setShow] = useState(true);
//   const [quizId, setQuizId] = useState(null);
//   const [name_user,setname]=useState(null)
 

//   const submit = (e) => {
//     e.preventDefault();
//     const quizIdValue = quiz_id_ref.current?.value;
//     const name_user_value=name.current?.value;
//     if (quizIdValue) {
//       setQuizId(quizIdValue);
//       setShow(false);
//       setname(name_user_value)
//     } else {
//       alert("Please enter a valid quiz code");
//     }
//   };

//   return (
//     <>
//       {show ? (
//         <div className="bg-black min-h-screen">
//           <div className="h-[50vh] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${Ready})` }}>
//             <img src="08_quiz/src/assets/ready.jpg" alt="Ready for quiz" className="hidden" />
//             <div className="flex justify-center items-center h-screen">
//               <div className="bg-slate-900 p-8 rounded-lg shadow-md flex flex-col gap-4 w-80">
//                 <form onSubmit={submit}>
//                   <input 
//                     type="text" 
//                     placeholder="Name" 
//                     className="p-2 rounded border border-gray-300 text-base mb-2 w-full"
//                     ref={name}
//                   />
//                   <input 
//                     type="number"
//                     placeholder="Quizcode" 
//                     className="p-2 rounded border border-gray-300 text-base mb-2 w-full"
//                     ref={quiz_id_ref}
//                     required
//                     min="1"
//                   />
//                   <button 
//                     className="p-2 rounded bg-gray-500 text-white text-base cursor-pointer transition duration-300 hover:bg-gray-600 w-full" 
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <GiveQuiz formId={quizId} name={name_user} />
//         </div>
//       )}
//     </>
//   )
// }

// export default Home

import React, { useRef, useState } from 'react';
import Ready from 'C:/Users/lenovo/OneDrive/Desktop/React_js/08_quiz/src/assets/ready.png';
import GiveQuiz from './FormId';
import axios from 'axios';

function Home() {
  const name = useRef();
  const quiz_id_ref = useRef();
  const [show, setShow] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [name_user, setName] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const quizIdValue = quiz_id_ref.current?.value;
    const name_user_value = mail;
    if (quizIdValue) {
      try {
        const response = await axios.get(`http://localhost:5000/check-quiz/${quizIdValue}`);
        if (response.data.exists) {
          setQuizId(quizIdValue);
          setShow(false);
          setName(name_user_value);
        } else {
          alert("Quiz ID does not exist. Please enter a valid quiz code.");
        }
      } catch (error) {
        console.error("There was an error checking the quiz ID:", error);
        alert("Quiz ID does not exist. Please enter a valid quiz code.");
      }
    } else {
      alert("Please enter a valid quiz code");
    }
  };
  const mail=localStorage.getItem('email')??'null@gmail.com'

  return (
    <>
      {show ? (
        <div className=" flex  min-h-screen w-12/12 bg-gray-300">
          {/* <div className="h-[50vh] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${Ready})` }}> */}
            {/* <img src="08_quiz/src/assets/ready.jpg" alt="Ready for quiz" className="hidden" /> */}
            <div className="w-screen flex justify-center pt-12">
              {/* <p className='text-3xl p-8'>Are you ready for quiz?</p> */}
              <div className="bg-slate-100 p-8 rounded-lg shadow-md  gap-4  h-2/4  w-2/4">
              <p className='text-3xl font-bold text-center p-8'>Are you ready for quiz?</p>
                <form onSubmit={submit}>
                  {/* <input  
                    type="text" 
                    placeholder="Name" 
                    className="p-2 rounded border border-gray-300 text-base mb-2 w-full"
                    ref={name}
                  /> */}
                  <label htmlFor="qui" className=' pb-6 font-bold'> Enter Quiz code </label>
                  <input 
                    type="number"
                    placeholder="Quizcode" 
                    className="p-2 rounded border border-gray-300 text-base mb-2 w-full"
                    ref={quiz_id_ref}
                    required
                    min="1"
                  />
                  <button 
                    className="p-2 rounded bg-gray-500 text-white text-base cursor-pointer transition duration-300 hover:bg-gray-600 w-full" 
                    type="submit"
                  >
                   Start the Quiz
                  </button>
                </form>
              </div>
            </div>
          </div>
        // </div>
      ) : (
        <div className='bg-gray-300'>
          <GiveQuiz formId={quizId} name={name_user} />
        </div>
      )}
    </>
  )
}

export default Home;
