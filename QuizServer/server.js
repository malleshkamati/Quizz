const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'quiz_app',
    password: 'Mallesh@123',
    port: 5432,
});

// Endpoint to handle user signup
app.post('/signup', async (req, res) => {
    const { name, username, password, isadmin } = req.body;

    try {
        await pool.query('INSERT INTO users1 (name, username, password, is_admin) VALUES ($1, $2, $3, $4)', [name, username, password, isadmin]);
        console.log('User inserted');
        res.status(200).json({ message: 'User inserted' });
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to handle admin signup
app.post('/AdminSignup', async (req, res) => {
    const { name, username, password, isadmin } = req.body;

    try {
        await pool.query('INSERT INTO users1 (name, username, password, is_admin) VALUES ($1, $2, $3, $4)', [name, username, password, isadmin]);
        console.log('User inserted');
        res.status(200).json({ message: 'User inserted' });
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Endpoint to handle user signin
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users1 WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        console.log('User authenticated');
        res.status(200).json({ message: 'User authenticated', user: { name: user.name, username: user.username, isadmin: user.is_admin } });
    } catch (err) {
        console.error('Error during authentication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

let f_id=5

// Endpoint to create a quiz form
app.post('/createQuizForm', async (req, res) => {
    const { formTitle, userId, questions,created_by,time1 } = req.body;
    const f_id=parseInt(Math.random()*1000000)

    try {
        const formResult = await pool.query(
            'INSERT INTO quiz_form (id,form_title, user_id,createdby,time) VALUES ($1,$2, $3,$4,$5) RETURNING id',
            [f_id,formTitle, userId,created_by,time1]
        );
        const formId = formResult.rows[0].id;

        for (const question of questions) {
            const questionResult = await pool.query(
                'INSERT INTO quiz_question (form_id, question_title) VALUES ($1, $2) RETURNING id',
                [formId, question.questionTitle]
            );
            const questionId = questionResult.rows[0].id;

            for (const [index, option] of question.options.entries()) {
                await pool.query(
                    'INSERT INTO quiz_question_options (form_id, question_id, option_text, is_correct_option) VALUES ($1, $2, $3, $4)',
                    [formId, questionId, option, index === question.correctOptionIndex]
                );
            }
        }

        res.status(200).json({ message: `${f_id}` });
    } catch (err) {
        console.error('Error creating quiz form:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all quiz forms
app.get('/quizForms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM quizforms');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching quiz forms:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// app.get('/results/:mail',async(req,res)=>{
//     // const {name,form_id,total_questions}=req.params
//      const {mail}=req.params;
//      const username=mail.toString()

//  try {
//     const quiz_score=await pool.query('SELECT id,createdby FROM quiz_form where createdby=$1 ',[username]);
//     let a=quiz_score.rows[0].id
    
//     let sco=quiz_score.rows.map((row)=>parseInt(row.id))
    
//     let allscores_lst=[]
//     // console.log(a);

//     for(let i=0;i<sco.length;i++){
//     // const num=parseInt(a)
        
//     const allscores= await pool.query('select * from  quiz_scores where form_id=$1  ;',[sco[i]])
//        allscores_lst.concat( allscores.rows)}
    
//     res.status(200).json(allscores_lst)
    
//  } catch (error) {
//     console.error(error)
//     res.status(500).json({message:"scores are not avilable"});
//  }});


app.get('/results/:mail', async (req, res) => {
    const { mail } = req.params;
    const username = mail.toString();

    try {
        const quiz_score = await pool.query('SELECT id, createdby FROM quiz_form WHERE createdby = $1', [username]);
        let sco = quiz_score.rows.map((row) => parseInt(row.id));

        let allscores_lst = [];
        
        for (let i = 0; i < sco.length; i++) {
            const allscores = await pool.query('SELECT * FROM quiz_scores WHERE form_id = $1', [sco[i]]);
            allscores_lst = allscores_lst.concat(allscores.rows);
        }
        
        res.status(200).json(allscores_lst);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Scores are not available" });
    }
});










app.get('/quizForms/:formId/questions', async (req, res) => {
    const { formId } = req.params;

    try {
        // Fetch all questions for the form
        const questionsResult = await pool.query('SELECT * FROM quiz_question WHERE form_id = $1', [formId]);
        const questions = questionsResult.rows;

        // Fetch all options for the questions
        const optionsResult = await pool.query('SELECT * FROM quiz_question_options WHERE form_id = $1', [formId]);
        const options = optionsResult.rows;

        // Combine questions with their respective options
        const quizData = questions.map(question => ({
            ...question,
            options: options.filter(option => option.question_id === question.id)
        }));
        console.log(typeof quizData);

        const form_details= await pool.query('SELECT form_title,time FROM quiz_form WHERE id=$1',[formId]);
        const exam= form_details.rows;
        // quizData.push(exam)



        res.status(200).json(quizData);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('/qTitle/:formId',async(req,res)=>{
    const {formId}=req.params;

    try {
        const form_details= await pool.query('SELECT form_title,time FROM quiz_form WHERE id=$1',[formId]);
        const exam= form_details.rows;
        res.status(200).json(exam)

        
    } catch (error) {
        res.status(500).json({message:'error in quiz title and time'})
        
    }
})



// Endpoint to get user scores
app.get('/userScores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM userscores');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching user scores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get('/response/:resId', async (req, res) => {
    const {resId}=req.params
    try {
        const result = await pool.query('SELECT * FROM student_answers where form_id=$1',[resId]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching user scores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// ... (previous code remains unchanged)

// Endpoint to get a specific quiz by formId
app.get('/quiz/:', async (req, res) => {
    const { formId } = req.params;
   

    try {
        // Get quiz form details
        const formResult = await pool.query('SELECT * FROM quiz_form WHERE id = $1', [formId||'1']);
        if (formResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const quizForm = formResult.rows[0];

        // Get all questions for this quiz
        const questionsResult = await pool.query('SELECT * FROM quiz_question WHERE form_id = $1', [formId]);
        const questions = questionsResult.rows;

        // Get options for all questions
        const optionsResult = await pool.query('SELECT * FROM quiz_question_options WHERE form_id = $1', [formId]);
        const options = optionsResult.rows;

        // Organize the data
        const quizData = {
            id: quizForm.id,
            title: quizForm.form_title,
            questions: questions.map(question => ({
                id: question.id,
                title: question.question_title,
                options: options
                    .filter(option => option.question_id === question.id)
                    .map(option => ({
                        id: option.id,
                        text: option.option_text
                    }))
            }))
        };

        res.status(200).json(quizData);
    } catch (err) {
        console.error('Error fetching quiz:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to submit a student's quiz answers
app.post('/submitQuiz', async (req, res) => {
    const { userId, formId, answers,name,total_que } = req.body;

    try {
        console.log(total_que);
        let score = 0;
        let totalQuestions = answers.length;

        for (const answer of answers) {
            const { questionId, selectedOptionId } = answer;

            // Check if the selected option is correct
            const correctOptionResult = await pool.query(
                'SELECT * FROM quiz_question_options WHERE question_id = $1 AND is_correct_option = true',
                [questionId]
            );
            const correctOption = correctOptionResult.rows[0];

            if (correctOption && correctOption.id === selectedOptionId) {
                score++;
            }

            // Save the student's answer
            await pool.query(
                'INSERT INTO student_answers (user_id, form_id, question_id, selected_option_id,name) VALUES ($1, $2, $3, $4,$5)',
                [userId, formId, questionId, selectedOptionId,name]
            );
        }

        // Calculate percentage score
        const percentageScore = score+'/'+total_que

        const percent_score=((score/total_que)*100).toFixed(2)

        // Save the overall quiz score
        await pool.query(
            'INSERT INTO quiz_scores (user_id, form_id, score, total_questions,name,percent_score) VALUES ($1, $2, $3, $4,$5,$6)',
            [userId, formId, percentageScore, totalQuestions,name,percent_score]
        );

        res.status(200).json({ 
            message: 'Quiz submitted successfully', 
            score: percentageScore,
            totalQuestions: totalQuestions
        });
    } catch (err) {
        console.error('Error submitting quiz:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/user_table',async(req,res)=>{
    try {
        const response=pool.query('select * from users1');
        
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'unable to fetch usertable'})


    }
})

app.get('/check-quiz/:quizId', async (req, res) => {
    const { quizId } = req.params;
    try {
      const result = await pool.query('SELECT EXISTS (SELECT 1 FROM quiz_form WHERE id = $1);', [quizId]);
      if (result.rows[0].exists) {
        res.status(200).json({ exists: true });
      } else {
        res.status(404).json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.post('/profile',async(req,res)=>{
    const {fname,lname,pass,mail}=req.body;
    try {
        const data=pool.query('UPDATE users1 SET password=$2 WHERE username=$1 ',[mail,pass]);
        res.status(200).json({message:'PASSWORD UPDATED'})
        
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }


})

app.get('/myquiz/:mail',async(req,res)=>{
    const {mail}=req.params;
    const username=mail.toString()
    console.log(mail,username);
    try {
        const forms= await pool.query('SELECT id,form_title,createdby FROM quiz_form where createdby=$1 ',[username]);
        res.status(200).json(forms.rows)

        
    } catch (error) {
        res.status(500).json({message:"not illa"})
        
    }
})



// Fetch quiz form data
app.get('/getQuizForm/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const formResult = await pool.query('SELECT * FROM quiz_form WHERE id = $1', [id]);
        if (formResult.rows.length === 0) {
            return res.status(404).json({ error: 'Quiz form not found' });
        }

        const form = formResult.rows[0];
        const questionsResult = await pool.query('SELECT * FROM quiz_question WHERE form_id = $1', [id]);
        const questions = [];

        for (const question of questionsResult.rows) {
            const optionsResult = await pool.query(
                'SELECT * FROM quiz_question_options WHERE question_id = $1',
                [question.id]
            );

            questions.push({
                questionTitle: question.question_title,
                options: optionsResult.rows.map((option) => option.option_text),
                correctOptionIndex: optionsResult.rows.findIndex((option) => option.is_correct_option),
            });
        }

        res.status(200).json({
            id: form.id,
            formTitle: form.form_title,
            questions,
        });
    } catch (err) {
        console.error('Error fetching quiz form:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.put('/updateQuizForm/:id', async (req, res) => {
    const { id } = req.params;
    const { formTitle, userId, questions, created_by,time1 } = req.body;

    try {
        await pool.query('UPDATE quiz_form SET form_title = $1, user_id = $2, createdby = $3,time=$5 WHERE id = $4', [formTitle, userId, created_by, id,time1]);

        await pool.query('DELETE FROM quiz_question_options WHERE form_id = $1', [id]);
        await pool.query('DELETE FROM quiz_question WHERE form_id = $1', [id]);

        for (const question of questions) {
            const questionResult = await pool.query(
                'INSERT INTO quiz_question (form_id, question_title) VALUES ($1, $2) RETURNING id',
                [id, question.questionTitle]
            );
            const questionId = questionResult.rows[0].id;

            for (const [index, option] of question.options.entries()) {
                await pool.query(
                    'INSERT INTO quiz_question_options (form_id, question_id, option_text, is_correct_option) VALUES ($1, $2, $3, $4)',
                    [id, questionId, option, index === question.correctOptionIndex]
                );
            }
        }

        res.status(200).json({ message: 'Quiz updated successfully' });
    } catch (err) {
        console.error('Error updating quiz form:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.get('/profile/:mail', async (req, res) => {
    console.log('hi');
    const { mail } = req.params;
    const email = mail.toString();
    const profile = {};

    try {
        // Fetch user name
        const user_name_result = await pool.query('SELECT name FROM users1 WHERE username=$1', [email]);
        
        if (user_name_result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const name1 = user_name_result.rows[0].name;
        console.log(name1);

        // Fetch quiz scores
        const quiz_scores_result = await pool.query('SELECT * FROM quiz_scores WHERE name=$1', [email]);
        const results = quiz_scores_result.rows;

        // Construct profile object
        profile.name = name1;
        profile.scores = results;

        // Send response
        res.status(200).json({ profile });

    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});








app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
