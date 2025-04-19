import React, {use, useState} from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { Stack, Avatar, Button, ButtonGroup, Typography} from '@mui/material';
import { amber, blueGrey, orange } from '@mui/material/colors';
import ToolBar from '../components/ToolBar';

import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

// The arrays for testing that will be replaced when we get user data proper
var userName = ["Abel", "Bender", "Chirst", "Don", "Eve"];
var userDistance = [1.5, 2, 2.5, 4, 1];
var userMaxHeartRate = [145, 150, 155, 135, 115];
var userDuration = [0.5, 0.25, 0.3, 0.35, 0.5];

// The arrays needed to store data that will be displayed later
var leaders = ["1", "2", "3", "4", "5"];
var leaderData = ["NULL", "NULL", "NULL", "NULL", "NULL"];
var maxMinMedian = ["max", "min", "median"];


function handleButtons(buttonNum, setLeaderType, SetName, SetValues, setMeasure, setMaxMinMedian){
  // uses a switch state that takes the number value of the button that was used then sets display data accordingly
  // when setting the display values it uses the arrays at the top and copies them to the html arrays
  var dataType = "Sorted by ";
  var unitsOfMeasurement = "";
  switch (buttonNum){
    case 1:
      sortData(userDistance, userName);
      dataType += "Distance";
      unitsOfMeasurement = " mi"
      break;
    case 2:
      sortData(userMaxHeartRate, userName);
      dataType += "MaxHeartRate";
      unitsOfMeasurement = " bpm"
      break;
    case 3:
      sortData(userDuration, userName);
      dataType += "Duration";
      unitsOfMeasurement = "h";
      break;
  }
  setLeaderType(dataType + ":");
  SetName(leaders.slice(0, 5));
  SetValues(leaderData.slice(0, 5));
  setMeasure(unitsOfMeasurement)
  setMaxMinMedian(maxMinMedian.slice(0, 3));
}

function makeLeaders(exerciseData, userData){
// currectly only displays the largest value at the top can be fixed with suggetion below
// exerciseData[i] < exerciseData[i+1] then display in ascending or descending order
// stores the data in leaders, used for the names, and leaderData, used for the values
let n = userData.length;
leaders = userData.slice(0, n);
leaderData = exerciseData.slice(0, n);
for (let i = 1; i <= n; i++){
  leaders[i-1] = userData[n-i];
  leaderData[i-1] = exerciseData[n-i];
}
}

function findMaxMinMedian(sortedData){
  //gets the highest lowest and middle value (in that order) from the sorted data
  // then stores them in the array maxMinMedian which will be in handle buttons
  var lengthOfArray = sortedData.length;
  if (sortedData[0] > sortedData[lengthOfArray-1]){
    maxMinMedian[0] = sortedData[0];
    maxMinMedian[1] = sortedData[lengthOfArray-1];
  }
  else {
    maxMinMedian[0] = sortedData[lengthOfArray-1];
    maxMinMedian[1] = sortedData[0];
  }
  if (lengthOfArray%2 == 0) {
    maxMinMedian[2] = sortedData[lengthOfArray/2];
  }
  else {
    maxMinMedian[2] = sortedData[(lengthOfArray/2)-.5];
  }
}

function sortData(exerciseData, userData){
//bubble sort
//calls makeLeaders and findMaxMinMedian so they can use the sorted data
let n = exerciseData.length; 
let swapped = true;
let temp = exerciseData[0];
let userTemp = userData[0];
let sortedData = exerciseData.slice(0, n);
let sortedUser = userData.slice(0, n);

while(swapped){
  swapped = false
  JSON.stringify(temp)
  for(let i = 1; i < n; i++){
  if (sortedData[i-1] > sortedData[i]){
      temp = sortedData[i - 1];
      sortedData[i - 1] = sortedData[i];
      sortedData[i] = temp;

      userTemp = sortedUser[i - 1];
      sortedUser[i - 1] = sortedUser[i];
      sortedUser[i] = userTemp;

      swapped = true;
  }
  }
  n = n - 1;
}
makeLeaders(sortedData, sortedUser);
findMaxMinMedian(sortedData)
}

function LeaderBoard () {
  // arrays that store the dayplay data from the javascript, There might be another way to do this but I can't html good
  const navigate = useNavigate();
  const [message, setMessage] = useState('Please Click a Button');
  const [placeNames, setPlaces] = useState(["1st", "2nd", "3rd", "4th", "5th"]);
  const [placeValues, setValues] = useState(["XX", "XX", "XX", "XX", "XX"]);
  const [unitsOfMeasure, setMeasure] = useState([""]);
  const [maxMinMedian, setMMM] = useState(["__", "__", "__"])

  // most of the is pretty easy to read, but just in case
  // its starts with header of Leaderboard then the button which call handleButtons when clicked on
  // in handleButtons we pass in the arrays that will be used to display data later
  // after that we have the avaters of 1st 2nd and 3rd in that order, something to be expanded apon later
  // after that we have the top 5 users with their exercise value and unit of measurement for said value
  // lastly we have the button to return to the main page
  return (
    <>
      <ToolBar /> {/* add new elements */}
      <Stack direction="column" gap={2} marginBottom={3}>
        <Typography fontSize={36}>Leaderboard</Typography>

        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => handleButtons(1, setMessage, setPlaces, setValues, setMeasure, setMMM)}>Distance</Button>
          <Button onClick={() => handleButtons(2, setMessage, setPlaces, setValues, setMeasure, setMMM)}>MaxHeartRate</Button>
          <Button onClick={() => handleButtons(3, setMessage, setPlaces, setValues, setMeasure, setMMM)}>Duration</Button>
        </ButtonGroup>
        <Stack direction="row" gap={2} justifyContent={"center"}>
          <Avatar sx={{ bgcolor: amber[600] }} variant="square">{placeNames[0][0]}</Avatar>
          <Avatar sx={{ bgcolor: blueGrey[200] }} variant="square">{placeNames[1][0]}</Avatar>
          <Avatar sx={{ bgcolor: orange[500] }} variant="square">{placeNames[2][0]}</Avatar>
        </Stack>
        <Typography fontSize={20}>
        {message}
        <br></br>{placeNames[0]} -- {placeValues[0]} {unitsOfMeasure}
        <br></br>{placeNames[1]} -- {placeValues[1]} {unitsOfMeasure}
        <br></br>{placeNames[2]} -- {placeValues[2]} {unitsOfMeasure}
        <br></br>{placeNames[3]} -- {placeValues[3]} {unitsOfMeasure}
        <br></br>{placeNames[4]} -- {placeValues[4]} {unitsOfMeasure}
        </Typography>
        <Typography fontSize={20}>Max:{maxMinMedian[0]}  Min:{maxMinMedian[1]}  Median:{maxMinMedian[2]}</Typography>
        <MuiLink to="../HomePage" component={RouterLink}>Back to Home</MuiLink>
      </Stack>
    </>
  );
}
export default LeaderBoard
