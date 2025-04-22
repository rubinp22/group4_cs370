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
  // very similar to userData except it will hold the cumulative exercise data
  // for each user.
  const [userExercises, setUserExercises] = useState([]);
  const [cumulativeMetrics, setCumulativeMetrics] = useState([]);


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

  // When all user exercises are fetched, run the function above to accumulate
  // their metrics. 
  useEffect(() => {
    if (userExercises.length === 0) return;

    sumAllUserMetrics();
    console.log("3rd hook cumulativeMetrics: ", cumulativeMetrics)
  }, [userExercises])


  return (
    <>
      <ToolBar /> {/* add new elements */}

    </>
  );
}
export default LeaderBoard
