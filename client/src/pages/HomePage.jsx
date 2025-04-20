import { Stack, Typography, Button, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import GlobalStateContext from "../contexts/GlobalStateContext";
import { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import ToolBar from "../components/ToolBar";

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
    <>
        <ToolBar /> {/* <-- Toolbar at the top */}
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
          {state.user === "" ? (
          <MuiLink sx={linkStyling} to="../" component={RouterLink}>
            My Profile
          </MuiLink>     
          ) : (
          <MuiLink sx={linkStyling} to={`./profile/${state.user}`} component={RouterLink}>
            My Profile
          </MuiLink>
          )}

          <MuiLink sx={linkStyling} to="./TrainingVideoLibrary" component={RouterLink}>
            Video Library
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={2} padding={1} justifyContent={"center"}>
          <MuiLink sx={linkStyling} to="./DietPlan" component={RouterLink}>
            Diet Plan
          </MuiLink>
        </Stack>

        <Stack marginTop="150px" alignContent={"center"} alignItems={"center"}>
          {state.user === "" ? (
            <MuiLink to="../" sx={linkStyling} component={RouterLink}>
              Log In
            </MuiLink>
          ) : (
            <MuiLink to="../" sx={linkStyling} component={RouterLink}>
              Log Out
            </MuiLink>
          )}

        </Stack>

      </Stack>
    </Stack>
  </>
  );
}

export default HomePage;
