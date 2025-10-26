 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../api';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `/signup`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      toast.success('Signup successful! 🎉', {
        position: 'top-center',
        autoClose: 2000,
      });

      dispatch(addUser(res.data.data));

      // redirect thoda delay se ho taki toast dikhe
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error);
      toast.error('Signup failed. Please try again.', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className='main-container'>
      <div className='signup-container'>
        <h2>Create Your Account</h2>

        <form onSubmit={handleSignup}>
          {step === 1 && (
            <>
              <label htmlFor='firstName'>First Name:</label>
              <input
                type='text'
                id='firstName'
                placeholder='Enter First Name..'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor='lastName'>Last Name:</label>
              <input
                type='text'
                id='lastName'
                placeholder='Enter Last Name..'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label htmlFor='emailId'>Email:</label>
              <input
                type='email'
                id='emailId'
                placeholder='Enter Email..'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />

              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                placeholder='Enter Password..'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type='button' onClick={() => setStep(2)}>
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label htmlFor='age'>Age:</label>
              <input
                type='number'
                id='age'
                placeholder='Enter Age..'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <label htmlFor='gender'>Gender:</label>
              <select
                id='gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>

              <label htmlFor='about'>About:</label>
              <input
                type='text'
                id='about'
                placeholder='Tell something about yourself..'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <label htmlFor='skills'>Skills:</label>
              <input
                type='text'
                id='skills'
                placeholder='Enter your skills..'
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <label htmlFor='photoUrl'>Photo URL:</label>
              <input
                type='text'
                id='photoUrl'
                placeholder='Enter Photo URL..'
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <div className='step-buttons'>
                <button
                  type='button'
                  className='back-btn'
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button type='submit'>Sign Up</button>
              </div>
            </>
          )}
        </form>

        <p className='login-link'>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;






 





 