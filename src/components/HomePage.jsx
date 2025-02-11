import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h2>Fitness Tracker</h2>
        <p>Take charge of your health</p>
        <button onClick={() => navigate('/fitnessTypes')}>My Metrics</button>
      </div>
    );
}

export default HomePage