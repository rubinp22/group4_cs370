import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from "./components/HomePage"
import FitnessTypesPage from './components/FitnessTypesPage';
import WeightLiftingMetrics from './components/WeightLiftingMetrics';
import RunningMetrics from './components/RunningMetrics';
import SportsSelection from './components/SportsSelection';
import StretchMetrics from './components/StretchMetrics';
import HikingMetrics from './components/HikingMetrics';
import GoalsMetrics from './components/GoalsMetrics';
import CyclingMetrics from './components/CyclingMetrics';
import SwimmingMetrics from './components/SwimmingMetrics';


function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fitnessTypes" element={<FitnessTypesPage />} />
          <Route path="/fitnessTypes/WeightLiftingMetrics" element={<WeightLiftingMetrics />} />
          <Route path="/fitnessTypes/RunningMetrics" element={<RunningMetrics/>} />
          <Route path="/fitnessTypes/SportsSelection" element={<SportsSelection/>} />
          <Route path="/fitnessTypes/StretchMetrics" element={<StretchMetrics/>} />
          <Route path="/fitnessTypes/HikingMetrics" element={<HikingMetrics/>} />
          <Route path="/fitnessTypes/GoalsMetrics" element={<GoalsMetrics/>} />
          <Route path="/fitnessTypes/CyclingMetrics" element={<CyclingMetrics/>}/>
          <Route path="/fitnessTypes/SwimmingMetrics" element={<SwimmingMetrics/>}/>
        </Routes>
      </Router>
    </>


  );
}

export default App;