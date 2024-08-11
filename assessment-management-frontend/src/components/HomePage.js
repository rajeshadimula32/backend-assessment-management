import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div className='homepage'>
      <nav className='navbar'>
          <a>
            <Link to="/login">Login</Link>
          </a>
          <a>
            <Link to="/register">Register</Link>
          </a>
      </nav>
      <h1 className='title'>Welcome to the Assessment Management System</h1>
    </div>
  );
};

export default HomePage;
