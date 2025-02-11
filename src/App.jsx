import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Fitness Tracker</h2>
      <p>Take charge of your health</p>
      <button onClick={() => navigate('/second')}>My Metrics</button>
    </div>
  );
}

function SecondPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Fitness Type</h2>
      <p>WEIGHTS</p>
      <p>RUNNING</p>
      <p>SPORTS</p>
      <p>STRETCH</p>
      <p>HIKING</p>
      <p>GOALS</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Fitness Tracker</h1>
      <p>Measure Your Health and Fitness</p>
      <button onClick={() => navigate('/')}>Go to Home Page</button>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
