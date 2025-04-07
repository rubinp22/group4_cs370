import React, { useState } from 'react';
import { Stack, Button, Chip, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

const RewardAchievements = () => {
const [metrics, setMetrics] = useState({});
const [badges, setBadges] = useState([]);

const fitnessGoals = {
  Miles_ran: { goal: 8, badge: "Endurance Runner" },
  Weight_lifted: { goal: 12, badge: "Heavy Lifter" },
  RepsPerSet: { goal: 10, badge: "Big Sets" },
  Bicycle_range: { goal: 40, badge: "Cyclist Winner" },
  Mph_biked: { goal: 30, badge: "Speed Cycler" },
  Elevation_gained: { goal: 60, badge: "Mountain Gainer" },
  Distance_ran: { goal: 32, badge: "Long Distance Goal" },
  TimePerLaps: { goal: 40, badge: "Speed Swimmer" },
  Sprint_speed: { goal: 20, badge: "Good Sprinter" },
  CaloriesPerMile: { goal: 80, badge: "Calorie Burner" },
  OneRepMax: { goal: 15, badge: "Strong Lifter" },
  Strength_ratio: { goal: 2.5, badge: "Strength Badge" },
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setMetrics((prev) => ({ ...prev, [name]: Number(value) }));
};

const checkAchievements = () => {
  const earnedBadges = [];
  Object.keys(metrics).forEach((metric) => {
    if (metrics[metric] >= fitnessGoals[metric].goal) {
      earnedBadges.push(fitnessGoals[metric].badge);
    }
  });
  setBadges(earnedBadges);
};

return (
  <Stack spacing={3}>
    <h1>Fitness Tracker</h1>
    {Object.keys(fitnessGoals).map((metric) => (
      <Box key={metric} display="flex" alignItems="center" justifyContent="space-between">
        <label>{`${metric.replace("_", " ")}: `}</label>
        <Box display="flex" alignItems="center">
          <input
            type="number"
            name={metric}
            value={metrics[metric] || ""}
            onChange={handleInputChange}
            style={{ padding: "8px", width: "120px", marginRight: "10px" }}
          />
          <span>{`Goal: ${fitnessGoals[metric].goal}`}</span>
        </Box>
      </Box>
    ))}
    <Button
      variant="contained"
      color="primary"
      onClick={checkAchievements}
      style={{ marginTop: "20px" }}
    >
      Check Achievements
    </Button>
    <h2>Badges Earned:</h2>
    <Box display="flex" flexWrap="wrap" gap={2}>
      {badges.length > 0 ? (
        badges.map((badge, index) => (
          <Chip
            key={index}
            label={badge}
            color="primary"
            style={{ fontSize: '16px', padding: '10px 20px', backgroundColor: '#ffb74d' }}
          />
        ))
      ) : (
        <p>No badges earned yet.</p>
      )}
    </Box>
    <MuiLink to="../HomePage" component={RouterLink} className="button-link">Back to Home</MuiLink>
  </Stack>
);
};

export default RewardAchievements;
