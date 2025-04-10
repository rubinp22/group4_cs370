import { Stack, Typography, Grid2 } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {
  return (
    <Stack width={"500px"}>
      <Typography fontSize="36px">Fitness Tracker</Typography>
      <Typography>Take charge of your health:</Typography>

      <Stack width={"100%"} marginTop={5}>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink width={"50%"} to="./fitnessTypes" component={RouterLink}>
            My Metrics
          </MuiLink>
          <MuiLink width={"50%"} to="./RecordExercises" component={RouterLink}>
            Record Exercise
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink width={"50%"} to="./RewardAchievements" component={RouterLink}>
            Achievements
          </MuiLink>
          <MuiLink width={"50%"} to="./LeaderBoard" component={RouterLink}>
            Leaderboard
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink width={"50%"} to="./profile" component={RouterLink}>
            My Profile
          </MuiLink>
          <MuiLink width={"50%"} to="./TrainingVideoLibrary" component={RouterLink}>
            Video Library
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1} justifyContent={"center"}>
          <MuiLink width={"48%"} to="./DietPlan" component={RouterLink}>
            Diet Plan
          </MuiLink>
          
        </Stack>

      </Stack>
    </Stack>
  );
}

export default HomePage;
