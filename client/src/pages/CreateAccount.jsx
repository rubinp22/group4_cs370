
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, InputAdornment } from '@mui/material';
import axios from 'axios';
import GlobalStateContext from "../contexts/GlobalStateContext";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

const linkStyling = {
  fontSize: {lg: 18, md: 16, sm: 14, xs: 12},
  width: {lg: 200, md: 175, sm: 150, xs: 130}
}

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [enteringUserInfo, setEnteringUserInfo] = useState(false);
  const [name, setName] = useState('');
  const [heightFeet, setHeightFeet] = useState(undefined);
  const [heightInches, setHeightInches] = useState(undefined);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    name: false,
    heightFeet: false,
    heightInches: false,
    weight: false,
    description: false
  })

  const [helperTexts, setHelperTexts] = useState({
    username: "",
    password: "",
    name: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    description: ""
  })

  // check for errors
  function isError() {

    // check if user already exists
    const findUser = allUsers.find(user => username === user.username);

    // check for errors + set helper text message
    let userError = true;
    let userHelper = "";
    if (findUser) {
      userHelper = "That username is taken";
    } else if (username === "") {
      userHelper = "Please enter a username";
    } else if (username.length > 29) {
      userHelper = "Please enter a username less than 30 characters";
    } else if (username.length < 4) {
      userHelper = "Please enter a username that is 4 or more characters";
    } else {
      userError = false;
    }

    let passwordError = true;
    let passwordHelper = "";
    if (password === "") {
      passwordHelper = "Please enter a password";
    } else if (password.length > 99) {
      passwordHelper = "Please enter a username less than 100 characters";
    } else if (password.length < 5) {
      passwordHelper = "Please enter a password that is 5 or more characters";
    } else if (password != confirmedPass) {
      passwordHelper = "Passwords do not match";
    } else {
      passwordError = false;
    }

    // update helper texts
    let newHelper = {
      username: userHelper,
      password: passwordHelper
    }
    setHelperTexts(newHelper);

    // update errors
    let newErrors = {
        username: userError,
        password: passwordError,
    }

    setErrors(newErrors);

    // Converting the newErrors object to a Boolean array of just the values from the newErrors object
    let newErrorsArray = Object.values(newErrors)
    let errorFound = false;

    // Loop through the new Boolean array, setting errorFound to true if any values are true
    newErrorsArray.forEach(val => {
        if (val === true) {
            errorFound = true;
        }
    })

    return errorFound;
}

useEffect(() => {
  async function getProfileData() {
    try {
      const res = await axios.get('http://localhost:3000/users', {
        headers: {
          'Content-Type': 'application/json'
        },
        // Calling with no parameters will give us all users
        params: { }
      });
      // The API respose is stored in state
      setAllUsers(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }

  }
  // Calling the function above
  getProfileData();
}, []);
  
  const handleSubmitCredentials = () => {
    if (!isError()) {
          setEnteringUserInfo(true);
        //createUser();
        //setAccountCreated(true);
    }
  }

  const handleSubmitUserInfo = () => {
    console.log("handleSubmitUserInfo")
    // if (!isErrorInfo())
      // with extra info
      //createUser();
      //setAccountCreated(true);

  }

  async function createUser() {
    // create new user if no errors found
    const newUser = {username: username, password: password};
    try {
        await axios.post('http://localhost:3000/users/', newUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
      } catch (error) {
        console.error('Error creating new profile:', error);
      }
  }

  return (
    <Stack>
      <Typography fontSize={36}>{enteringUserInfo ? "Tell us about yourself" : "Create New Account"}</Typography>
      <Stack spacing={2} alignItems="flex-start" sx={{ width: 300, margin: 'auto', mt: 5 }}>
        {enteringUserInfo ? (
          <>
            <Typography>Name:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={helperTexts.name}
            />
            <Typography>Height:</Typography>
            <Stack direction="row">
              <TextField
                variant="outlined"
                fullWidth
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                error={errors.heightFeet}
                helperText={helperTexts.heightFeet}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Ft</InputAdornment>
                }}
                sx={{width: "50%"}}
              />
              <TextField
                variant="outlined"
                fullWidth
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                error={errors.heightInches}
                helperText={helperTexts.heightInches}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>In</InputAdornment>
                }}
                sx={{width: "50%"}}
              />
            </Stack>
            <Typography>Weight:</Typography>
            <TextField
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                error={errors.weight}
                helperText={helperTexts.weight}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>lbs</InputAdornment>
                }}
              />
              <Typography>Description:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
                helperText={helperTexts.description}
                multiline
                maxRows={6}
              />
              
          </>
        ) : (
          <>
            <Typography>Username:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              helperText={helperTexts.username}
            />
            <Typography>Password:</Typography>
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={helperTexts.password}
            />
            <Typography>Confirm Password:</Typography>
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              value={confirmedPass}
              onChange={(e) => setConfirmedPass(e.target.value)}
              error={errors.password}
            />
          </>
        )}

      </Stack>
        {accountCreated ? (
        <Stack alignItems={"center"}>
            <br/>
            <Typography>Account created!</Typography>
            <MuiLink sx={linkStyling} to="../" component={RouterLink}>
                Return to Log In
            </MuiLink> 
        </Stack>): 
        (<Stack alignItems={"center"}>
            <Button variant="contained" onClick={enteringUserInfo ? (handleSubmitUserInfo) : (handleSubmitCredentials)} sx={{mt: 5, width: "40%"}}>
                Submit
            </Button>
            <br/>
            <MuiLink sx={linkStyling} to="../" component={RouterLink}>
                Cancel
            </MuiLink>
        </Stack>)}  
    </Stack>
  );
}

export default CreateAccount;