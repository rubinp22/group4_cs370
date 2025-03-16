import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {

  return (
    <>
      <h1>Fitness Tracker</h1>
      <h3>Take charge of your health:</h3>

      <div style={styles.buttonContainer}>
        <Link to="./fitnessTypes" style={styles.link}>
          My Metrics
        </Link>
        <Link to="./RewardAchievements" style={styles.link}>
          Achievements
        </Link>
        <Link to="./LeaderBoard" style={styles.link}>
          Leaderboard
        </Link>
        <Link to="./profile" style={styles.link}>
          My Profile
        </Link>
        <Link to="./TrainingVideoLibrary" style={styles.link}>
          TrainingVideoLibrary
        </Link>
      </div>
    </div>
  );
}

export default HomePage
