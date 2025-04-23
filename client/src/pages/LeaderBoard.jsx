import { useNavigate, Link  } from 'react-router-dom';
import { Stack, Avatar, Button, ButtonGroup, Typography} from '@mui/material';
import { amber, blueGrey, orange } from '@mui/material/colors';
import ToolBar from '../components/ToolBar';
import GlobalStateContext from '../contexts/GlobalStateContext';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';


function LeaderBoard () {

  const { state, dispatch } = useContext(GlobalStateContext)
  const [userData, setUserData] = useState([]);
  const [userExercises, setUserExercises] = useState([]);
  const [cumulativeMetrics, setCumulativeMetrics] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState();

  // Ex: run, hike, cycle, swim, weights
  const [exerciseCategory, setExerciseCategory] = useState(undefined);
  // Ex: distance, duration, steps, totalVolume, lapCount, etc...
  const [exerciseMetric, setExerciseMetric] = useState(undefined);

  // Fetching every user from the database
  async function getUserData() {
    try {
        const res = await axios.get('http://localhost:3000/users', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            params: { }
        });
        return res.data
    } catch (err) {
        console.log(err);
    }
}

// Fetching all the exercises that are associated with a userID
async function getUserExercises(id) {
  try {
    const res = await axios.get('http://localhost:3000/exercises', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        userID: id
      }
    });
      return res.data;
  } catch (err) {
    console.log(err);
  }
}

// When page loads, fetch all user profile data
useEffect(() => {
  async function fetchData() {
    const response = await getUserData();
    setUserData(response);
  }

  // Calling the function above
  fetchData();

}, [])

// When userData is assigned a value, fetch an array of all exercises associated
// with a user, but for all users.
// We want a list of which users have done which exercises
useEffect(() => {
  async function fetchExercises() {
    if (userData.length === 0) return;

    // The result of this sequence of API requests is stored in metricsArray
    // We make sure that all async promises are fulfilled within metricsArray
    // before moving on.
    const metricsArray = await Promise.all(
      userData.map(async (user, idx) => {
        const userExercises = await getUserExercises(user._id);
        return { name: user.name, metrics: userExercises };  
      })
    )

    // set user metrics to our newly-fulfilled array of user exercises
    setUserExercises(metricsArray)
  }

  // Calling the function above
  fetchExercises();
}, [userData])


  // This function goes through our list of exercises per user and creates an
  // object (metric) that holds an accumulation of all relevant stats that we
  // can use to feed into a leaderboard. 
  async function sumAllUserMetrics() {

    let allMetrics = [];

    userExercises.map((user, idx) => {

      let metric = {
        name: user.name,
        distance: {
            run: 0,
            cycle: 0,
            hike: 0
        },
        duration: {
            run: 0,
            cycle: 0,
            hike: 0
        },
        elevationGain: {
            cycle: 0,
            hike: 0
        },
        elevationLoss: 0,
        maxHeartRate: 1,
        steps: 0,
        maxWeightOfWeights: 0,
        totalVolume: 0,
        totalReps: 0,
        lapCount: 0,
        totalLapTime: 0,
        totalStrokes: 0
      }

      user.metrics.map((data, idx) => {

        if (data.type === "run") {
            metric.distance.run += data.distance;
            metric.duration.run += data.duration;
            metric.steps += data.steps;
        } else if (data.type === "hike") {
            metric.elevationGain.hike += data.elevationGain;
            metric.distance.hike += data.distance;
            metric.duration.hike += data.duration;
        } else if (data.type === "cycle") {
            metric.distance.cycle += data.distance;
            metric.duration.cycle += data.duration;
            metric.elevationGain.cycle += data.elevationGain;
        } else if (data.type === "swim") {
            metric.lapCount += data.lapCount;
            data.lapTimes.map((data, idx) => {
                metric.totalLapTime += data;
            })
            data.strokeCount.map((data, idx) => {
                metric.totalStrokes += data
            })
        } else if (data.type === "weights") {
            metric.totalReps += (data.reps * data.sets);
            if (metric.maxWeightOfWeights < data.weightOfWeights) {
                metric.maxWeightOfWeights = data.weightOfWeights
            }
            metric.totalVolume += (data.reps * data.sets * data.weightOfWeights);

        }

        if (metric.maxHeartRate < data.maxHeartRate) {
            metric.maxHeartRate = data.maxHeartRate;
        }
      })

      allMetrics.push(metric);
    })

    setCumulativeMetrics(allMetrics);
  }

  function populateLeaderboard() {

    let leaderboard = {
      run: {
        distance: [ /*{distance: null, name: null}*/ ],
        duration: [ /*{duration: null, name: null}*/ ],
        steps: [ /*{steps: null, name: null} */]
      },
      hike: {
        distance: [ /*{distance: null, name: null}*/ ],
        duration: [ /*{duration: null, name: null}*/ ],
        elevationGain: [ /*{elevationGain: null, name: null}*/ ]
      },
      cycle: {
        distance: [ /*{distance: null, name: null}*/ ],
        duration: [ /*{duration: null, name: null}*/ ],
        elevationGain: [ /*{elevationGain: null, name: null}*/ ]
      },
      swim: {
        lapCount: [ /*{lapCount: null, name: null}*/ ],
        totalLapTime: [ /*{totalLapTime: null, name: null}*/ ],
        totalStrokes: [ /*{totalStrokes: null, name: null}*/ ]
      },
      weights: {
        totalReps: [ /*{totalReps: null, name: null}*/ ],
        maxWeightOfWeights: [ /*{maxWeightOfWeights: null, name: null}*/ ],
        totalVolume: [ /*{totalVolume: null, name: null}*/ ]
      }
    }

    // Loop through all cumulative metrics and store them in the leaderboard object above
    // first without sorting
    cumulativeMetrics.map((user, idx) => {
      leaderboard.run.distance.push({ distance: user.distance.run, name: user.name });
      leaderboard.run.duration.push({ duration: user.duration.run, name: user.name });
      leaderboard.run.steps.push({ steps: user.steps, name: user.name });

      leaderboard.hike.distance.push({ distance: user.distance.hike, name: user.name });
      leaderboard.hike.duration.push({ duration: user.duration.hike, name: user.name });
      leaderboard.hike.elevationGain.push({ elevationGain: user.elevationGain.hike, name: user.name });

      leaderboard.cycle.distance.push({ distance: user.distance.cycle, name: user.name });
      leaderboard.cycle.duration.push({ duration: user.duration.cycle, name: user.name });
      leaderboard.cycle.elevationGain.push({ elevationGain: user.elevationGain.cycle, name: user.name });

      leaderboard.swim.lapCount.push({ lapCount: user.lapCount, name: user.name });
      leaderboard.swim.totalLapTime.push({ totalLapTime: user.totalLapTime, name: user.name });
      leaderboard.swim.totalStrokes.push({ totalStrokes: user.totalStrokes, name: user.name });

      leaderboard.weights.totalReps.push({ totalReps: user.totalReps, name: user.name });
      leaderboard.weights.maxWeightOfWeights.push({ maxWeightOfWeights: user.maxWeightOfWeights, name: user.name });
      leaderboard.weights.totalVolume.push({ totalVolume: user.totalVolume, name: user.name });
    })

    return leaderboard;
  }

  // Use the sort function to sort each object in the array of the respective category of metric
  // In other words, each object represents a user's cumulative data for a specfic metric, and we 
  // are sorting these objects by the the value (first element)
  function sortLeaderboard(leaderboard) {
    // If we wanted ascending order, our dispatch function we are sending to sort() would look
    // something like this: (a, b) => a.value - b.value
    leaderboard.run.distance.sort((a, b) => b.distance - a.distance);
    leaderboard.run.duration.sort((a, b) => b.duration - a.duration);
    leaderboard.run.steps.sort((a, b) => b.steps - a.steps);

    leaderboard.hike.distance.sort((a, b) => b.distance - a.distance);
    leaderboard.hike.duration.sort((a, b) => b.duration - a.duration);
    leaderboard.hike.elevationGain.sort((a, b) => b.elevationGain - a.elevationGain);

    leaderboard.cycle.distance.sort((a, b) => b.distance - a.distance);
    leaderboard.cycle.duration.sort((a, b) => b.duration - a.duration);
    leaderboard.cycle.elevationGain.sort((a, b) => b.elevationGain - a.elevationGain);

    leaderboard.swim.lapCount.sort((a, b) => b.lapCount - a.lapCount);
    leaderboard.swim.totalLapTime.sort((a, b) => b.totalLapTime - a.totalLapTime);
    leaderboard.swim.totalStrokes.sort((a, b) => b.totalStrokes - a.totalStrokes);

    leaderboard.weights.totalReps.sort((a, b) => b.totalReps - a.totalReps);
    leaderboard.weights.maxWeightOfWeights.sort((a, b) => b.maxWeightOfWeights - a.maxWeightOfWeights);
    leaderboard.weights.totalVolume.sort((a, b) => b.totalVolume - a.totalVolume);

    console.log("sorted: ", leaderboard);

    return leaderboard;
    
  }

  // When all user exercises are fetched, run the function above to accumulate
  // their metrics. 
  useEffect(() => {
    if (userExercises.length === 0) return;

    sumAllUserMetrics();
    //console.log("3rd hook cumulativeMetrics: ", cumulativeMetrics)

    const leaderboard = populateLeaderboard();
    const sortedLeaderboard = sortLeaderboard(leaderboard);

    // Once we have a sorted leaderboard, we store it in state, triggering a DOM re-render, and for 
    // our data to be visible on screen!
    setLeaderboardData(sortedLeaderboard);



  }, [userExercises])

  // Testing whether I can traverse the leaderboardData object
  useEffect(() => {
    if (exerciseCategory !== undefined && exerciseMetric !== undefined) {
      console.log("selected leaderboard metric: ", leaderboardData[exerciseCategory][exerciseMetric]);
    } 
  }, [exerciseMetric])


  return (
    <>
      <ToolBar />

      <Stack alignItems={"center"}>
        <Typography fontSize={36} marginBottom={10}>Leaderboard</Typography>

        <Typography marginBottom={2} fontSize={24}>Select an exercise category:</Typography>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button onClick={() => setExerciseCategory("run")}>Running</Button>
          <Button onClick={() => setExerciseCategory("hike")}>Hiking</Button>
          <Button onClick={() => setExerciseCategory("cycle")}>Cycling</Button>
          <Button onClick={() => setExerciseCategory("swim")}>Swimming</Button>
          <Button onClick={() => setExerciseCategory("weights")}>Weightlifting</Button>
        </ButtonGroup>

        <Stack margin={5}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {exerciseCategory === "run" ? (
              <>
                <Typography 
                  alignContent={"center"} 
                  justifyContent={"center"} 
                  marginRight={5}
                  fontSize={24}
                >
                  Running Metrics
                </Typography>

                <Button onClick={() => setExerciseMetric("distance")}>Distance</Button>
                <Button onClick={() => setExerciseMetric("duration")}>Duration</Button>
                <Button onClick={() => setExerciseMetric("steps")}>Steps</Button>

              </>
            ) : (<></>)}
          {exerciseCategory === "hike" ? (
            <>
                <Typography 
                  alignContent={"center"} 
                  justifyContent={"center"} 
                  marginRight={5}
                  fontSize={24}
                >
                  Hiking Metrics
                </Typography>

                <Button onClick={() => setExerciseMetric("distance")}>Distance</Button>
                <Button onClick={() => setExerciseMetric("duration")}>Duration</Button>
                <Button onClick={() => setExerciseMetric("elevationGain")}>Elevation Gain</Button>
            </>
          ) : (<></>)}
          {exerciseCategory === "cycle" ? (
            <>
                <Typography 
                  alignContent={"center"} 
                  justifyContent={"center"} 
                  marginRight={5}
                  fontSize={24}
                >
                  Cycling Metrics
                </Typography>

                <Button onClick={() => setExerciseMetric("distance")}>Distance</Button>
                <Button onClick={() => setExerciseMetric("duration")}>Duration</Button>
                <Button onClick={() => setExerciseMetric("elevationGain")}>Elevation Gain</Button>
            </>
          ) : (<></>)}
          {exerciseCategory === "swim" ? (
            <>
                <Typography 
                  alignContent={"center"} 
                  justifyContent={"center"} 
                  marginRight={5}
                  fontSize={24}
                >
                  Swimming Metrics
                </Typography>

                <Button onClick={() => setExerciseMetric("lapCount")}>Lap Count</Button>
                <Button onClick={() => setExerciseMetric("totalLapTime")}>Total Lap Time</Button>
                <Button onClick={() => setExerciseMetric("totalStrokes")}>Total Strokes</Button>
            </>
          ) : (<></>)}
          {exerciseCategory === "weights" ? (
            <>
                <Typography 
                  alignContent={"center"} 
                  justifyContent={"center"} 
                  marginRight={5}
                  fontSize={24}
                >
                  Weightlifting Metrics
                </Typography>

                <Button onClick={() => setExerciseMetric("totalReps")}>Total Reps</Button>
                <Button onClick={() => setExerciseMetric("maxWeightOfWeights")}>Max Weight Of Weights</Button>
                <Button onClick={() => setExerciseMetric("totalVolume")}>Total Volume</Button>
            </>
          ) : (<></>)}
        </ButtonGroup>
        </Stack>


      </Stack>

      <Stack margin={5}>
        <MuiLink to="../HomePage" component={RouterLink}>Back to Home</MuiLink>
      </Stack>

    </>
  );
}
export default LeaderBoard
