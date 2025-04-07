import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import DietPlan from './pages/DietPlan'; 
import LoginPage from "./pages/LoginPage";
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
import LeaderBoard from './pages/LeaderBoard';
import RewardAchievements from './pages/RewardAchievements';
import ProfilePage from './pages/ProfilePage';
import TrainingVideoLibrary from './pages/TrainingVideoLibrary';
import RecordExercises from './pages/RecordExercises';

function App() {
 return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="/HomePage/fitnessTypes" element={<FitnessTypesPage />} />
          <Route path="/HomePage/fitnessTypes/WeightLiftingMetrics" element={<WeightLiftingMetrics />} />
          <Route path="/HomePage/fitnessTypes/RunningMetrics" element={<RunningMetrics/>} />
          <Route path="/HomePage/fitnessTypes/SportsSelection" element={<SportsSelection/>} />
          <Route path="/HomePage/fitnessTypes/StretchMetrics" element={<StretchMetrics/>} />
          <Route path="/HomePage/fitnessTypes/HikingMetrics" element={<HikingMetrics/>} />
          <Route path="/HomePage/fitnessTypes/GoalsMetrics" element={<GoalsMetrics/>} />
          <Route path="/HomePage/fitnessTypes/CyclingMetrics" element={<CyclingMetrics/>}/>
          <Route path="/HomePage/fitnessTypes/SwimmingMetrics" element={<SwimmingMetrics/>}/>
          <Route path="/HomePage/LeaderBoard" element={<LeaderBoard/>}/>
          <Route path="/HomePage/profile" element={<ProfilePage/>} />
          <Route path="/HomePage/RewardAchievements" element={<RewardAchievements/>}/>
          <Route path="/HomePage/TrainingVideoLibrary" element={<TrainingVideoLibrary/>}/>
          <Route path="/HomePage/RecordExercises" element={<RecordExercises/>}/>
          <Route path="/HomePage/DietPlan" element={<DietPlan/>} />
        </Routes>
      </Router>
    </>


 );
}

export default App;
