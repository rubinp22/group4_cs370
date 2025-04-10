import { Stack, Typography, Grid2 } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {

  // Responsive Design based on screen width
  const linkStyling = {
    fontSize: {lg: 18, md: 16, sm: 14, xs: 12},
    width: {lg: 200, md: 175, sm: 150, xs: 130}
  }

  // Testing Global State
  const { state, dispatch } = useContext(GlobalStateContext)
  console.log("state: ", state)

  return (
    <Stack >
      <Typography fontSize={36}>Fitness Tracker</Typography>
      <Typography>Take charge of your health:</Typography>

      <Stack width={"100%"} marginTop={5}>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink sx={linkStyling} to="./fitnessTypes" component={RouterLink}>
            My Metrics
          </MuiLink>
          <MuiLink sx={linkStyling} to="./RecordExercises" component={RouterLink}>
            Record Exercise
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink sx={linkStyling} to="./RewardAchievements" component={RouterLink}>
            Achievements
          </MuiLink>
          <MuiLink sx={linkStyling} to="./LeaderBoard" component={RouterLink}>
            Leaderboard
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1}>
          <MuiLink sx={linkStyling} to="./profile" component={RouterLink}>
            My Profile
          </MuiLink>
          <MuiLink sx={linkStyling} to="./TrainingVideoLibrary" component={RouterLink}>
            Video Library
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1} justifyContent={"center"}>
          <MuiLink sx={linkStyling} to="./DietPlan" component={RouterLink}>
            Diet Plan
          </MuiLink>
          
        </Stack>

      </Stack>
    </Stack>
  );
}

export default HomePage;
