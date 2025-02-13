import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import './App.css';

import HomePage from "./components/HomePage"
import FitnessTypesPage from './components/FitnessTypesPage';
import WeightLiftingMetrics from './components/WeightLiftingMetrics';

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
