import { useNavigate } from 'react-router-dom';

function FitnessTypesPage () {
    const navigate = useNavigate();

    // Eventually we might consider replacing these h2 and p elements with Typography elements from MUI
    // They allow for more robust customization that doesn't rely on CSS classes, like pointer-hover
    return (
      <div>
        <h2>Fitness Type</h2>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/RunningMetrics')}>RUNNING</p>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/HikingMetrics')}>HIKING</p>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/CyclingMetrics')}>CYCLING</p>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/SwimmingMetrics')}>SWIMMING</p>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/WeightLiftingMetrics')}>WEIGHT LIFTING</p>
        {/* <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/HikingMetrics')}>BODY WEIGHT EXERCISES</p> */}
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/SportsSelection')}>SPORTS</p>
        {/* <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/StretchMetrics')}>STRETCH</p> */}
        {/* <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/GoalsMetrics')}>GOALS</p> */}
  
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
}

export default FitnessTypesPage