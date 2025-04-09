import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Grid2 } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

function HomePage() {
  //Load theme from localStorage to light mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  //Toggle that saves to the localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Reset scroll position to base page 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Dynamic styles for the full coverage
  const styles = {
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh", //covers the full screen height
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: darkMode ? "#121212" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
      transition: "background-color 0.3s ease, color 0.3s ease",
      overflow: "hidden", //avoids issues with scrolling
    },
    button: {
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
      backgroundColor: darkMode ? "#f39c12" : "#007bff",
      color: darkMode ? "#000000" : "#ffffff",
      fontSize: "16px",
      borderRadius: "5px",
      marginBottom: "20px",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    buttonContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      width: "80%",
      maxWidth: "500px",
    },
    link: {
      textDecoration: "none",
      padding: "12px 18px",
      borderRadius: "5px",
      backgroundColor: darkMode ? "#444" : "#007bff",
      color: "#fff",
      textAlign: "center",
      fontSize: "18px",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  };

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
