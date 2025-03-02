import { Link } from 'react-router-dom';

function HomePage() {

    return (
      <div>
        <h1>Fitness Tracker</h1>
        <h3>Take charge of your health:</h3>
        <Link to="./fitnessTypes" className="button-link">My Metrics</Link>
        <Link to="./RewardAchievements" className="button-link">Achievements</Link>
        <Link to="./LeaderBoard" className="button-link">Leaderboard</Link>
        <Link to="./profile" className="button-link">My Profile</Link>
      </div>
    );
}

export default HomePage
