
import React, { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, InputAdornment, Avatar } from '@mui/material';
import axios from 'axios';
import GlobalStateContext from "../contexts/GlobalStateContext";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import ProfilePictures from '../data/ProfilePictures';
import ListItemIcon from '@mui/material/ListItemIcon';

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
  const [pfp, setpfp] = useState('/images/profileImages/profile1.png')
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

  // check for errors relating to username and password
  function isCredentialError() {

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

// check for errors relating to user info
function isInfoError() {
  let nameError = true;
  let nameHelper = "";
  if (name === "") {
    nameHelper = "Please enter a name";
  } else if (name.length > 30) {
    nameHelper = "Exceeded character limit of 30 by " + (name.length - 30);
  } else {
    nameError = false;
  }

  let heightFeetError = true;
  let heightFeetHelper = "";
  if (heightFeet === "") {
    heightFeetHelper = "Please enter Feet";
  } else if (heightFeet > 7 || heightFeet < 1) {
    heightFeetHelper = "Valid range: 1 - 7";
  } else {
    heightFeetError = false;
  }

  let heightInchesError = true;
  let heightInchesHelper = "";
  if (heightInches === "") {
    heightInchesHelper = "Please enter Inches";
  } else if (heightInches > 11 || heightInches < 0) {
    heightInchesHelper = "Valid range: 0 - 11";
  } else {
    heightInchesError = false;
  }

  let weightError = true;
  let weightHelper = "";
  if (weight === "") {
    weightHelper = "Please enter a weight";
  } else if (weight > 1000 || weight < 1) {
    weightHelper = "Valid range: 1 - 1000";
  } else {
    weightError = false;
  }

  let descriptionError = true;
  let descriptionHelper = "";
  if (description === "") {
    descriptionHelper = "Please enter a description"
  } else if (description.length > 200) {
    descriptionHelper = "Exceeded character limit of 200 by " + (description.length - 200);
  } else {
    descriptionError = false;
  }

  let newHelper = {
    name: nameHelper,
    heightFeet: heightFeetHelper,
    heightInches: heightInchesHelper,
    weight: weightHelper,
    description: descriptionHelper
  }

  setHelperTexts(newHelper);

  let newErrors = {
    name: nameError,
    heightFeet: heightFeetError,
    heightInches: heightInchesError,
    weight: weightError,
    description: descriptionError
  }

  setErrors(newErrors);

  let newErrorsArray = Object.values(newErrors)
  let errorFound = false;

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
    if (!isCredentialError()) {
          setEnteringUserInfo(true);
    }
  }

  const handleSubmitUserInfo = () => {
      if (!isInfoError()) {
        createUser();
        setAccountCreated(true);
      }

  }

  async function createUser() {
    // create new user if no errors found
    const newUser = {
      username: username, 
      password: password,
      name: name,
      heightFeet: heightFeet,
      heightInch: heightInches,
      weightArray: {
        weight: weight,
        dateLogged: Date.now()
      },
      description: description,
      pfp: pfp
    };
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
              <Typography>Profile Description:</Typography>
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
              <Typography>Profile Picture:</Typography>
              <TextField
                  variant="outlined"
                  fullWidth
                  value={pfp}
                  onChange={(e) => setpfp(e.target.value)}
                  select
              >
                {ProfilePictures.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <ListItemIcon>
                        <Avatar
                          src={option.value}
                          alt={option.label}
                          sx={{ width: 32, height: 32, marginRight: 4 }}
                        />
                      </ListItemIcon>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>

              
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