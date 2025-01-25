// import React from 'react';

// const About = () => {
//   return (
//     <div className="about-page">
//       <h1>About the Quiz</h1>
//       <p>Welcome to our quiz app! This app is designed to test your knowledge and skills in a fun and interactive way.</p>
//       <h2>How it works</h2>
//       <ul>
//         <li>The quiz consists of multiple questions, each with a set of options to choose from.</li>
//         <li>You can select one or more options, depending on the question type.</li>
//         <li>Once you've answered a question, you can submit it and move on to the next one.</li>
//         <li>Your progress and scores will be tracked as you complete the quiz.</li>
//       </ul>
//       <h2>What to expect</h2>
//       <ul>
//         <li>A range of question types, including multiple-choice, true/false, and open-ended questions.</li>
//         <li>Questions on various topics, including history, science, sports, music, and more.</li>
//         <li>A fun and engaging interface that makes learning and testing your knowledge enjoyable.</li>
//         <li>The ability to track your progress and compare your scores with others.</li>
//       </ul>
//       <h2>Why take the quiz?</h2>
//       <ul>
//         <li>To test your knowledge and identify areas for improvement.</li>
//         <li>To learn new things and expand your knowledge.</li>
//         <li>To have fun and challenge yourself.</li>
//         <li>To compete with others and see how you rank.</li>
//       </ul>
//       <p>We hope you enjoy the quiz! Let us know if you have any questions or feedback. Good luck, and happy quizzing!</p>
//     </div>
//   );
// };

// export default About;


import React from 'react';

const About = () => {
  return (
    <div className="about-page p-10 bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">About the Quiz</h1>
      <p className="mb-6">Welcome to our quiz app! This app is designed to test your knowledge and skills in a fun and interactive way.</p>
      <h2 className="text-2xl font-semibold mb-2">How it works</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">The quiz consists of multiple questions, each with a set of options to choose from.</li>
        <li className="mb-2">You can select one or more options, depending on the question type.</li>
        <li className="mb-2">Once you've answered a question, you can submit it and move on to the next one.</li>
        <li className="mb-2">Your progress and scores will be tracked as you complete the quiz.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">What to expect</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">A range of question types, including multiple-choice, true/false, and open-ended questions.</li>
        <li className="mb-2">Questions on various topics, including history, science, sports, music, and more.</li>
        <li className="mb-2">A fun and engaging interface that makes learning and testing your knowledge enjoyable.</li>
        <li className="mb-2">The ability to track your progress and compare your scores with others.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Why take the quiz?</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">To test your knowledge and identify areas for improvement.</li>
        <li className="mb-2">To learn new things and expand your knowledge.</li>
        <li className="mb-2">To have fun and challenge yourself.</li>
        <li className="mb-2">To compete with others and see how you rank.</li>
      </ul>
      <p>We hope you enjoy the quiz! Let us know if you have any questions or feedback. Good luck, and happy quizzing!</p>
    </div>
  );
};

export default About;
