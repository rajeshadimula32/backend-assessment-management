import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <nav className='navbar'>
          <a>
            <Link to="/questions">Questions</Link>
          </a>
          <a>
          <Link to="/candidates">Candidates</Link>
          </a>
      </nav>
    </div>
  );
};

export default Dashboard;
