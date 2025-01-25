
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GiveQuiz({ formId,name }) {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState('');
  const [time_title,setTimetitle]=useState(1);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [tq,setTq]=useState(0);

  useEffect(() => {
    details(),
    fetchQuiz();
    
  }, [formId]);
  const home=useNavigate()
   



  const details=async(req,res)=>{
    try {
      const qTitle=await axios.get(`http://localhost:5000/qTitle/${formId}`);
      const ans=qTitle.data
      console.log((ans));
      setTimetitle(ans)
      setTimeRemaining( (ans[0].time)* 60)
      
    } catch (error) {
      console.log(error);
      
    }

  }


    useEffect(() => {
    fetchQuiz();
  }, [formId]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !quizSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizSubmitted]);
  



  const formatTime = (seconds) => {
    if (seconds === null) return "Loading...";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };






  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/quizForms/${formId}/questions`);
      
      setQuiz(response.data);
      setTq(response.data.length)
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const responses = Object.entries(selectedOptions).map(([questionId, optionId]) => ({
        questionId: parseInt(questionId),
        selectedOptionId: optionId
      }));

      const response = await axios.post('http://localhost:5000/submitQuiz', {
        userId: 1, 
        formId: formId,
        answers: responses,
        name:name,
        total_que:tq
      });

      setScore(response.data.score);
      setQuizSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="bg-slate-100 shadow-lg rounded-lg p-20 ">
      {!quizSubmitted?<><h1 className='text-3xl font-bold text-center'>{time_title[0].form_title}</h1>
      <h1 className='text-xl text-blue-400 '>
        Total time : 
        {time_title[0].time} minutes
      </h1>
      <h2 className="text-xl  text-red-400  mb-4">Time Remaining: {formatTime(timeRemaining)}</h2></>:null}
      <h1 className="text-xl font-bold text-blue-800 mb-4">{quiz.title}</h1>
      {!quizSubmitted ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Question {currentQuestionIndex + 1} of {quiz.length}
          </p>
          <div className="mb-6">
            <p className="text-xl font-medium mb-4">
              Q{currentQuestionIndex + 1}. {currentQuestion.question_title}
            </p>
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center border p-3 m-3 pt-2 text-base hover:bg-slate-300 rounded-xl"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    className="form-radio text-blue-600"
                    checked={selectedOptions[currentQuestion.id] === option.id}
                    onChange={() => handleOptionSelect(currentQuestion.id, option.id)}
                  />
                  <span className="ml-2">{option.option_text}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < quiz.length - 1 ? (
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center mb-64">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">Your score: {score}</p>
          <button className='px-7 p-2 bg-blue-700 text-white hover:bg-blue-500 rounded-md mt-10' onClick={()=>home('/home')}>Home</button>
        </div>
      )}
    </div>
  );
}

export default GiveQuiz;


































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function GiveQuiz({ formId, name }) {
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [score, setScore] = useState('');
//   const [timeRemaining, setTimeRemaining] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuiz();
//   }, [formId]);

//   useEffect(() => {
//     if (timeRemaining !== null && timeRemaining > 0 && !quizSubmitted) {
//       const timer = setInterval(() => {
//         setTimeRemaining((prevTime) => prevTime - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     } else if (timeRemaining === 0 && !quizSubmitted) {
//       handleSubmitQuiz();
//     }
//   }, [timeRemaining, quizSubmitted]);

//   const fetchQuiz = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/quizForms/${formId}/questions`);
//       setQuiz(response.data);
//       const quizTime = response.data[1][0].time; // Assuming quiz time is in minutes
//       setTimeRemaining(quizTime * 60); // Set time in seconds
//     } catch (error) {
//       console.error('Error fetching quiz:', error);
//     }
//   };

//   const handleOptionSelect = (questionId, optionId) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [questionId]: optionId
//     });
//   };

//   const handleSubmitQuiz = async () => {
//     if (quizSubmitted) return; // Prevent multiple submissions

//     try {
//       const responses = Object.entries(selectedOptions).map(([questionId, optionId]) => ({
//         questionId: parseInt(questionId),
//         selectedOptionId: optionId
//       }));

//       const response = await axios.post('http://localhost:5000/submitQuiz', {
//         userId: 1,
//         formId: formId,
//         answers: responses,
//         name: name
//       });

//       setScore(response.data.score);
//       setQuizSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   const formatTime = (seconds) => {
//     if (seconds === null) return "Loading...";
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   if (!quiz || timeRemaining === null) {
//     return <div>Loading quiz...</div>;
//   }

//   const currentQuestion = quiz[0][currentQuestionIndex];

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-12 m-10">
//       <h1 className='text-3xl font-bold text-center'>{time_title.form_title}</h1>
//       <h2 className="text-xl  text-red-400  mb-4">Time Remaining: {formatTime(timeRemaining)}</h2>
//       <h1 className="text-xl font-bold text-blue-800 mb-4">{quiz[0].title}</h1>
//       {!quizSubmitted ? (
//         <>
//           <p className="text-sm text-gray-500 mb-4">
//             Question {currentQuestionIndex + 1} of {quiz[0].length}
//           </p>
//           <div className="mb-6">
//             <p className="text-xl font-medium mb-4">
//               Q{currentQuestionIndex + 1}. {currentQuestion.question_title}
//             </p>
//             <div className="space-y-2">
//               {currentQuestion.options.map((option) => (
//                 <label
//                   key={option.id}
//                   className="flex items-center border p-3 m-3 pt-2 text-base hover:bg-slate-300 rounded-xl"
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${currentQuestion.id}`}
//                     className="form-radio text-blue-600"
//                     checked={selectedOptions[currentQuestion.id] === option.id}
//                     onChange={() => handleOptionSelect(currentQuestion.id, option.id)}
//                   />
//                   <span className="ml-2">{option.option_text}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//               onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
//               disabled={currentQuestionIndex === 0}
//             >
//               Previous
//             </button>
//             {currentQuestionIndex < quiz[0].length - 1 ? (
//               <button
//                 type="button"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleSubmitQuiz}
//               >
//                 Submit Quiz
//               </button>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="text-center mb-64">
//           <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
//           <p className="text-xl">Your score: {score}</p>
//           <button className='px-7 p-2 bg-blue-700 text-white hover:bg-blue-500 rounded-md mt-10' onClick={() => navigate('/home')}>Home</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GiveQuiz;