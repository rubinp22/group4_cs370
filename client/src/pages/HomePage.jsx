import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import GlobalStateContext from "../contexts/GlobalStateContext";
import { Button } from "@mui/material";

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

  // Testing Global State
  const { state, dispatch } = useContext(GlobalStateContext)
  console.log("state: ", state)

  return (
    <div style={styles.container}>
      {/* Dark Mode Toggle Button */}
      <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Fitness Tracker</h1>
      <h3>Take charge of your health:</h3>

      <div style={styles.buttonContainer}>
        <Link to="./fitnessTypes" style={styles.link}>
          My Metrics
        </Link>
        <Link to="./RecordExercises" style={styles.link}>
          Record Exercise
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
          Video Library
        </Link>
        <Link to="./DietPlan" style={styles.link}>
          Diet Plan
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
