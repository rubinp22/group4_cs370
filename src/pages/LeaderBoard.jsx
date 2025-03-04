import React, {useState} from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { Stack, Avatar, Button, ButtonGroup, AvatarGroup} from '@mui/material';
import { amber, blueGrey, orange } from '@mui/material/colors';
// "Leader of" should be at the top
const options = ['Miles Per Hour', 'Distance', 'Rebase and merge'];

var userName = ["Abel", "Bender", "Chirst", "Don", "Eve"];
var userDistance = [1.5, 2, 2.5, 4, 1];
var userMaxHeartRate = [145, 150, 155, 135, 115];
var userDuration = [0.5, 0.25, 0.3, 0.35, 0.5];
var leaders = ["1", "2", "3", "4", "5"];
var leaderData = ["NULL", "NULL", "NULL", "NULL", "NULL"];


function handleButtons(buttonNum, setLeaderType, SetName, SetValues, setMeasure){
  //could maybe have an if statement in the switch there for other value
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
}

function makeLeaders(exerciseData, userData){
// nmight need to add a case for say fastest time where it checks
// exerciseData[i] < exerciseData[i+1] then display in ascending descending order
// to account for cases when smaller value is better 
let n = userData.length;
leaders = userData.slice(0, n);
leaderData = exerciseData.slice(0, n);
for (let i = 1; i <= n; i++){
  leaders[i-1] = userData[n-i];
  leaderData[i-1] = exerciseData[n-i];
}
alert("leaders: " + leaders.join(", ") + " | numbers: " + leaderData.join(", "))
}

function sortData(exerciseData, userData){
//bubble sort
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
}

function LeaderBoard () {
  const navigate = useNavigate();
  // there has to be a better way to do this
  const [message, setMessage] = useState('Please Click a Button');
  const [placeNames, setPlaces] = useState(["1st", "2nd", "3rd", "4th", "5th"]);
  const [placeValues, setValues] = useState(["XX", "XX", "XX", "XX", "XX"]);
  const [unitsOfMeasure, setMeasure] = useState([""]);

  // Eventually we might consider replacing these h2 and p elements with Typography elements from MUI
  // They allow for more robust customization that doesn't rely on CSS classes, like pointer-hover
  return (
  <Stack direction="column" gap={2} marginBottom={3}>
    <h1>Leaderboard</h1>
    <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => handleButtons(1, setMessage, setPlaces, setValues, setMeasure)}>Distance</Button>
        <Button onClick={() => handleButtons(2, setMessage, setPlaces, setValues, setMeasure)}>MaxHeartRate</Button>
        <Button onClick={() => handleButtons(3, setMessage, setPlaces, setValues, setMeasure)}>Duration</Button>
      </ButtonGroup>
    <Stack direction="row" gap={2} paddingLeft={13.5}>
      <Avatar sx={{ bgcolor: amber[600] }} variant="square">{placeNames[0][0]}</Avatar>
      <Avatar sx={{ bgcolor: blueGrey[200] }} variant="square">{placeNames[1][0]}</Avatar>
      <Avatar sx={{ bgcolor: orange[500] }} variant="square">{placeNames[2][0]}</Avatar>
    </Stack>
    <p>
    {message}
    <br></br>{placeNames[0]} -- {placeValues[0]} {unitsOfMeasure}
    <br></br>{placeNames[1]} -- {placeValues[1]} {unitsOfMeasure}
    <br></br>{placeNames[2]} -- {placeValues[2]} {unitsOfMeasure}
    <br></br>{placeNames[3]} -- {placeValues[3]} {unitsOfMeasure}
    <br></br>{placeNames[4]} -- {placeValues[4]} {unitsOfMeasure}
    </p>
      <Link to="../" className="button-link">Back to Home</Link>
  </Stack>
  );
}

export default LeaderBoard