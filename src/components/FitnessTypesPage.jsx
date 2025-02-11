import { useNavigate } from 'react-router-dom';

function FitnessTypesPage () {
    const navigate = useNavigate();

    // Eventually we might consider replacing these h2 and p elements with Typography elements from MUI
    // They allow for more robust customization that doesn't rely on CSS classes, like pointer-hover
    return (
      <div>
        <h2>Fitness Type</h2>
        <p className="pointer-hover" onClick={() => navigate('/fitnessTypes/WeightLiftingMetrics')}>WEIGHTS</p>
        <p>RUNNING</p>
        <p>SPORTS</p>
        <p>STRETCH</p>
        <p>HIKING</p>
        <p>GOALS</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
}

export default FitnessTypesPage