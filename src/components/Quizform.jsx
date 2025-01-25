
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Quizform({ initialData, isEditMode }) {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [quizCode, setQuizCode] = useState(null);
  const [sub, setSub] = useState(true);
  const home = useNavigate();
  const give = useNavigate();
  const [time1,setTime1]=useState(null)

  useEffect(() => {
    if (isEditMode && initialData) {
      setQuestions(initialData.questions);
      setFormTitle(initialData.formTitle);
    }
  }, [initialData, isEditMode]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionTitle: '',
        options: ['', '', '', ''],
        correctOptionIndex: null,
        time:1
      },
    ]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionTitle = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOptionIndex = oIndex;
    setQuestions(newQuestions);
  };

  const creater = localStorage.getItem('email') ?? '';

  const handleSubmitQuiz = async (event) => {
    event.preventDefault();
    const quizData = {
      formTitle,
      userId: 1,
      created_by: creater,
      questions: questions.map((question) => ({
        questionTitle: question.questionTitle,
        options: question.options,
        correctOptionIndex: question.correctOptionIndex,
       
      })),
      time1:time1
    };

    try {
      console.log(quizData);
      const result = isEditMode
        ? await axios.put(`http://localhost:5000/updateQuizForm/${initialData.id}`, quizData)
        : await axios.post('http://localhost:5000/createQuizForm', quizData);

      console.log('Quiz submitted successfully', result.data);
      setQuizCode(` ${result.data.message}`);
      setSub(false);
      alert(`Quiz form submitted successfully with ${result.data.message}`);
      if (isEditMode){
        home('/home')
      }
      setSub(false)
    } catch (error) {
      console.error('Error submitting quiz form', error);
      alert('Error submitting quiz form');
    }
  };

  return (
    <>
      <>
      {sub ? 
        <form onSubmit={handleSubmitQuiz} className="bg-slate-100 shadow-lg rounded-lg p-12 m-10 min-h-96">
          <div className="mb-4 ">
            <p className='text-3xl font-bold text-center'>Create quiz</p>
            <h1 className="text-xl font-bold text-blue-800 pb-2 mt-10 ">Quiz Title</h1>
            <input
              type="text"
              name="formTitle"
              placeholder="Quiz Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="p-2 w-full border mb-5"
              required
            />
            <label htmlFor="time" className="text-xl  text-blue-800 pb-2 pt-10 ">Time for quiz(in minutes)</label>
            <input type='number'  name='time' placeholder='enter time in minutes' value={time1} onChange={(e)=>setTime1(e.target.value)} className="p-2 w-full border"
              required/>
            <p className="text-sm text-gray-500">Total Questions: {questions.length}</p>
          </div>
          {questions.map((question, qIndex) => (
            <div className="mb-6" key={qIndex}>
              <p className="text-xl font-medium mb-4 ml-2">Q {qIndex + 1}.</p>
              <div className='flex flex-col float-end'>
             <button
               type="button"
               className="text-white bg-red-600  p-2 rounded text-sm"
               onClick={() => deleteQuestion(qIndex)}
             >
               Delete Question
             </button>
             </div>
              <textarea
                id={`question-${qIndex}`}
                name={`question-${qIndex}`}
                className="p-1 w-11/12 border"
                placeholder="Write the question here"
                value={question.questionTitle}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center border p-3 m-3 pt-2 text-base hover:bg-slate-300 rounded-xl"
                  >
                    <input
                      type="radio"
                      name={`correctOption-${qIndex}`}
                      className="form-radio text-blue-600"
                      checked={question.correctOptionIndex === oIndex}
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                    />
                    <input
                      type="text"
                      name={`option-${qIndex}-${oIndex}`}
                      id={`option-${qIndex}-${oIndex}`}
                      className="pl-3 ml-1 w-11/12 rounded-lg"
                      placeholder="Option text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              onClick={addQuestion}
            >
              Add Question
            </button>
            {/* <button
              type="button"
              className="text-white bg-red-600 ml-4 p-2 rounded"
              onClick={() => deleteQuestion(qIndex)}
            >
              Delete Question
            </button> */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit Quiz
            </button>
          </div>
        </form>
       :
        <div className='qcoode text-2xl  w-3/4 bg-white mt-10 rounded-3xl  h-40'>
          <p className='pl-10 pt-2'>Quiz code :{quizCode}</p>
          <div className='btn flex'>
            <button
              className='bg-blue-400 text-white text-sm p-2 rounded-md hover:bg-blue-700 ml-24 mt-16'
              onClick={() => {
                give('/take_quiz');
                setSub(true);
                window.location.reload();
              }}
            >
              Add another quiz
            </button>
            <button
              className='bg-blue-400 text-white text-sm p-2 rounded-md hover:bg-blue-700 ml-48 mt-16'
              onClick={() => { home('/home') }}
            >
              Home
            </button>
          </div>
        </div>
      }
      </>
      
    </>
  );
}

export default Quizform;




          