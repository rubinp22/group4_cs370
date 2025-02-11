import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from "./components/HomePage"
import FitnessTypesPage from './components/FitnessTypesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fitnessTypes" element={<FitnessTypesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
