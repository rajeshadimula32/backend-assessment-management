import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import QuestionManagement from './components/QuestionManagement';
import CandidateManagement from './components/CandidateManagement';
import Login from './components/Login';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/questions" element={<QuestionManagement />} />
      <Route path="/candidates" element={<CandidateManagement />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
