import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Exam({ quizId }) {
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    quizData.questions.forEach(question => {
      const correctOption = question.options.find(option => option.iscorrectoption);
      if (answers[question.id] === correctOption.id) {
        score += 1;
      }
    });
    setScore(score);
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quizData.form.formtitle}</h1>
      {quizData.questions.map((question, qIndex) => (
        <div key={question.id} className="question-container">
          <h2 className="question-title">
            {qIndex + 1}. {question.questiontitle}
          </h2>
          <div className="options-container">
            {question.options.map(option => (
              <label key={option.id} className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleOptionChange(question.id, option.id)}
                />
                {option.optiontext}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="submit-button" onClick={handleSubmit}>
        Submit Quiz
      </button>
      {score !== null && <div className="score">Your score: {score} / {quizData.questions.length}</div>}
    </div>
  );
}

export default Exam;
