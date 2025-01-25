import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function Results() {
  const [scores, setScores] = useState([]);
  const [resId, setResId] = useState(0);
  const [res, setRes] = useState([]);
  const idRef = useRef();
  const mail=localStorage.getItem('email')
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios(`http://localhost:5000/results/${mail}`);
        const data = await response.data;
        setScores(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScores();
  }, []);

  useEffect(() => {
    const fetchResponses = async () => {
      if (resId !== 0) {
        try {
          const response = await axios(`http://localhost:5000/response/${resId}`);
          const data = await response.data;
          setRes(Array.isArray(data) ? data : []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchResponses();
  }, [resId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setResId(idRef.current.value);
  };

  return (
    <>
    <div className='bg-gray-300 flex flex-col items-center'>
      <div className="tb min-h-fit ">
        <div className=" py-10">
          <p className="text-5xl text-red-500 text-center pb-5">Results</p>
          <table className="table-fixed bg-slate-200 align-middle justify-center">
            <thead>
              <tr className="tr border-2 rounded-lg">
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Quiz ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Name</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Total Questions</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s.id}>
                  <td className="text-center p-2">{s.form_id}</td>
                  <td className="text-center p-2">{s.name}</td>
                  <td className="text-center p-2">{s.total_questions}</td>
                  <td className="text-center p-2">{s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-5xl text-red-500 p-5 mt-10 ">Responses</p>
      <form onSubmit={handleSubmit} className="mx-96 my-4">
        <input type="text" ref={idRef} className="border p-2" placeholder="Enter Quiz ID" />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Submit</button>
      </form>
      <div className="tb min-h-screen">
      
        <div className="mx-96 my-10">
     
          <table className="table-fixed bg-slate-200 align-middle justify-center">
            <thead>
              <tr className="tr border-2 rounded-lg">
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">User ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Quiz ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Question ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Selected Option ID</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Created At</th>
                <th className="col border-2 text-lg bg-blue-500 text-white text-center p-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {res.map((item) => (
                <tr key={item.id}>
                  <td className="text-center p-2">{item.id}</td>
                  <td className="text-center p-2">{item.user_id}</td>
                  <td className="text-center p-2">{item.form_id}</td>
                  <td className="text-center p-2">{item.question_id}</td>
                  <td className="text-center p-2">{item.selected_option_id}</td>
                  <td className="text-center p-2">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="text-center p-2">{item.name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}

export default Results;
