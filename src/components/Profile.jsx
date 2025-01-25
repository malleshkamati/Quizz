
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Profile() {
    const fname_ref = useRef();
    const lname_ref = useRef();
    const pass_ref = useRef();
    const conpass_ref = useRef();
    const [err, set_err] = useState(false);
    const [update, setupdate] = useState(true);
    const relogin = useNavigate();
    const mail = localStorage.getItem('email');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profile, setProfile] = useState({ name: '', scores: [] });
    const [scores,setScores]=useState(false)

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profile/${mail}`);
                setProfile(response.data.profile);
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, [mail]);

    const confirm = async () => {
        const fname = fname_ref.current.value;
        const lname = lname_ref.current.value;
        const pass = pass_ref.current.value;
        const con_pass = conpass_ref.current.value;
        if (pass === con_pass) {
            const cred = { fname, lname, pass, mail };
            handlesubmit(cred);
        } else {
            set_err(true);
        }
    };

    const handlesubmit = async (cred) => {
        try {
            await axios.post('http://localhost:5000/profile', cred);
            console.log('Password updated, please re-login');
            setupdate(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        {!scores ?  <>  <div className='h-auto min-h-screen w-screen bg-gray-300 flex flex-col items-center mb-10'>
                <div className='w-1/2 bg-white min-h-screen h-auto  rounded-3xl p-10 mt-10 '>
                    <p className='text-3xl font-bold'>Welcome, {profile.name}!</p>
                    <div className='flex justify-end'>
                 {!scores? 
                    <button className='bg-blue-500 text-white  p-2 rounded-md px-3' onClick={()=>setScores(true)}> 
                        Profile
                    </button>:
                    <button className='bg-blue-500 text-white  p-2 rounded-md px-3' onClick={()=>setScores(false)}> 
                        My dashbord
                    </button>}
                    
                    </div>
                    {profile.scores.length > 0 ? (
                        <div className='mt-5 pb-3'>
                            <h2 className='text-2xl mb-4'>Your Quiz Scores</h2>
                            <table className='w-full table-auto '>
                                <thead>
                                    <tr>
                                        <th className='px-4 py-2 border'>Quiz ID</th>
                                        <th className='px-4 py-2 border'>Score</th>
                                        <th className='px-4 py-2 border'>Total Questions</th>
                                        <th className='px-4 py-2 border'>Percent score</th>
                                        <th className='px-4 py-2 border'>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.scores.map(score => (
                                        <tr key={score.id}>
                                            <td className='px-4 py-2 border'>{score.form_id}</td>
                                            <td className='px-4 py-2 border'>{score.score}</td>
                                            <td className='px-4 py-2 border'>{score.total_questions}</td>
                                            <td className='px-4 py-2 border'>{score.percent_score}%</td>
                                            <td className='px-4 py-2 border'>{new Date(score.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No quiz scores available.</p>
                    )}
                </div>
            </div>
            </>
            :
            <>
            <div className='min-h-screen bg-gray-300 pl-48 pt-10 pb-10'>
                <div className='bg-white w-2/4 ml-72 min-h-96 rounded-3xl' >
                    {update ? (
                        <>
                            <div className='flex flex-col px-36 pt-20'>
                                <h1 className='text-3xl font-bold text-center'>My Profile</h1>
                                <div className='flex justify-end'>
                                <button className='bg-blue-500 text-white  p-2 rounded-md px-3' onClick={()=>setScores(false)}> 
                                 My dashbord
                                </button>
                                </div>
                                <label htmlFor="Fname" className='p-4'>First name:</label>
                                <input type="text" className='name bg-slate-200 focus:bg-slate-300 focus:border-blue-500 p-1.5 rounded-md pl-8 w-full' ref={fname_ref} />
                                <label htmlFor="Lname" className='p-4'>Last name:</label>
                                <input type="text" className='name bg-slate-200 border-gray-300 focus:bg-slate-300 focus:border-blue-500 p-1.5 rounded-md pl-8 w-full' ref={lname_ref} />
                            </div>
                            <div className='mt-14 px-36 flex flex-col'>
                                <label htmlFor="password" className='pb-1'>Change password</label>
                                <div className='relative'>
                                    <input type={showPassword ? "text" : "password"} className='name bg-slate-200 focus:bg-slate-300 focus:border-blue-500 p-1.5 rounded-md pl-8 w-full' placeholder='New password' ref={pass_ref} />
                                    <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <label htmlFor="password" className='mb-1 mt-4'>Confirm password</label>
                                <div className='relative'>
                                    <input type={showConfirmPassword ? "text" : "password"} className='name bg-slate-200 focus:bg-slate-300 focus:border-blue-500 p-1.5 rounded-md pl-8 w-full' placeholder='Confirm password' ref={conpass_ref} />
                                    <button type="button" className='absolute right-3 top-1/2 transform -translate-y-1/2' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {err && <p className='err text-red-500'>Please confirm the password</p>}
                                <button className='btn p-2 text-white ml-20 bg-blue-500 mt-10 w-40 mb-32 rounded-lg hover:bg-blue-800' onClick={confirm}>Submit</button>
                            </div>
                        </>
                    ) : (
                        <div className='text-2xl p-10'>
                            Password has been updated, please re-login
                            <button className='btn p-2 text-white ml-20 bg-blue-500 mt-10 w-28 text-xl mb-32 rounded-lg hover:bg-blue-800' onClick={() => relogin('/')}>Re-login</button>
                        </div>
                    )}
                </div>
            </div>
            </>}
        </>
    );
}

export default Profile;
