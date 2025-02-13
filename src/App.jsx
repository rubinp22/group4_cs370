import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from "./components/HomePage"
import FitnessTypesPage from './components/FitnessTypesPage';
import WeightLiftingMetrics from './components/WeightLiftingMetrics';
import RunningMetrics from './components/RunningMetrics';
import SportsMetrics from './components/SportsMetrics';
import StretchMetrics from './components/StretchMetrics';
import HikingMetrics from './components/HikingMetrics';
import GoalsMetrics from './components/GoalsMetrics';


function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fitnessTypes" element={<FitnessTypesPage />} />
          <Route path="/fitnessTypes/WeightLiftingMetrics" element={<WeightLiftingMetrics />} />
          <Route path="/fitnessTypes/RunningMetrics" element={<RunningMetrics/>} />

          <Route path="/fitnessTypes/SportsMetrics" element={<SportsMetrics/>} />
          <Route path="/fitnessTypes/StretchMetrics" element={<StretchMetrics/>} />
          <Route path="/fitnessTypes/HikingMetrics" element={<HikingMetrics/>} />
          <Route path="/fitnessTypes/GoalsMetrics" element={<GoalsMetrics/>} />
        </Routes>
      </Router>
    </>


  );
}

export default App;