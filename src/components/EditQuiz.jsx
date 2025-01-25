// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Quizform from './Quizform';

// function EditQuiz() {
//   const { id } = useParams();
//   const [quizData, setQuizData] = useState(null);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getQuizForm/${id}`);
//         setQuizData(response.data);
//       } catch (error) {
//         console.error('Error fetching quiz data', error);
//       }
//     };

//     fetchQuizData();
//   }, [id]);

//   return quizData ? <Quizform initialData={quizData} isEditMode={true} /> : <p>Loading...</p>;
// }

// export default EditQuiz;









import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Quizform from './Quizform';

function EditQuiz() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getQuizForm/${id}`);
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data', error);
      }
    };

    fetchQuizData();
  }, [id]);

  return quizData ? <Quizform initialData={quizData} isEditMode={true} /> : <p>Loading...</p>;
}

export default EditQuiz;
