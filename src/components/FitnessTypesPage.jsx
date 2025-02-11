import { useNavigate } from 'react-router-dom';

function FitnessTypesPage () {
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

export default FitnessTypesPage