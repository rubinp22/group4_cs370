import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {

  return (
    <>
      <h1>Fitness Tracker</h1>
      <h3>Take charge of your health:</h3>

      <MuiLink to="./fitnessTypes" component={RouterLink} >My Metrics</MuiLink>
      <MuiLink to="./RewardAchievements" component={RouterLink} >Achievements</MuiLink>
      <MuiLink to="./LeaderBoard" component={RouterLink} >Leaderboard</MuiLink>
      <MuiLink to="./profile" component={RouterLink} >My Profile</MuiLink>
    </>

  );
}

export default HomePage
