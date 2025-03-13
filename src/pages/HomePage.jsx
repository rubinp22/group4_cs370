import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {

  return (
    <>
      <h1>Fitness Tracker</h1>
      <h3>Take charge of your health:</h3>

<<<<<<< HEAD
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
=======
      <MuiLink to="./fitnessTypes" component={RouterLink} >My Metrics</MuiLink>
      <MuiLink to="./RewardAchievements" component={RouterLink} >Achievements</MuiLink>
      <MuiLink to="./LeaderBoard" component={RouterLink} >Leaderboard</MuiLink>
      <MuiLink to="./profile" component={RouterLink} >My Profile</MuiLink>
    </>

>>>>>>> ccdcbf4 (Small Changes to our home page and fitness types page)
  );
}

export default HomePage
