import { Link } from 'react-router-dom';

function HomePage() {

    return (
      <div>
        <h2>Fitness Tracker</h2>
        <p>Take charge of your health</p>
        <Link to="./fitnessTypes" className="button-link">My Metrics</Link>
        <Link to="./LeaderBoard" className="button-link">Leaderboard</Link>
      </div>
    );
}

export default HomePage
