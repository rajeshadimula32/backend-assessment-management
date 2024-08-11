import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig'; // Adjust path based on your folder structure

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions');
        console.log(response.data.data)
        setQuestions(response.data.data); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;
