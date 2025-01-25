const express = require('express');
const app = express();
const { Pool } = require('pg');



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'quiz_app',
    password: 'Mallesh@123',
    port: 5432,
  });
  
app.get('/api/quiz/:id', async (req, res) => {

  const quizId = '1';
  try {
    const form = await pool.query('SELECT * FROM QuizForm WHERE id = $1', [quizId]);
    const questions = await pool.query('SELECT * FROM QuizQuestion WHERE formId = $1', [quizId]);
    const options = await pool.query('SELECT * FROM QuizQuestionOptions WHERE questionId = ANY(SELECT id FROM QuizQuestion WHERE formId = $1)', [quizId]);

    const quizData = {
      form: form.rows[0],
      questions: questions.rows.map(question => ({
        ...question,
        options: options.rows.filter(option => option.questionid === question.id),
      })),
    };

    res.json(quizData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
