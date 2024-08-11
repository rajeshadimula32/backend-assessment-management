import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/api/accounts/login', {
        email,
        password
      });
  
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', response.data.token); // Adjust based on your response structure
  
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, show message to user, etc.
    }
  };
  

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    
  );
};

export default LoginPage;
