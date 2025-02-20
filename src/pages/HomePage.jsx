import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h2>Fitness Tracker</h2>
        <p>Take charge of your health</p>
        <Link to="./fitnessTypes" className="button-link">My Metrics</Link>
        <br/>
        <Link to="./userGoals" className="button-link">My Goals</Link>
      </div>
    );
}

export default HomePage