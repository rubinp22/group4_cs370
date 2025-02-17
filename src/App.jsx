import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from "./pages/HomePage"
import FitnessTypesPage from './pages/FitnessTypesPage';
import WeightLiftingMetrics from './pages/WeightLiftingMetrics';
import RunningMetrics from './pages/RunningMetrics';
import SportsSelection from './pages/SportsSelection';
import StretchMetrics from './pages/StretchMetrics';
import HikingMetrics from './pages/HikingMetrics';
import GoalsMetrics from './pages/GoalsMetrics';
import CyclingMetrics from './pages/CyclingMetrics';
import SwimmingMetrics from './pages/SwimmingMetrics';


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