
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import GlobalStateContext from "../contexts/GlobalStateContext";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

const linkStyling = {
  fontSize: {lg: 18, md: 16, sm: 14, xs: 12},
  width: {lg: 200, md: 175, sm: 150, xs: 130}
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [isError, setIsError] = useState(false);

  const [helperTexts, setHelperTexts] = useState({
    username:"",
    password:""
  })

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

  // This holds all state defined in GlobalStateContext.jsx (user and theme)
  // However, we are only defining this here to use the dispatch function
  const { state, dispatch } = useContext(GlobalStateContext);

  // These two functions are tied into the reducer function in GlobalStateContext.jsx
  // Based on the type, certain data is editted
  const selectUser = (value) => {
    dispatch({ type: 'SETUSER', payload: value });
  }

  const setTheme = (value) => {
    dispatch({ type: 'SETTHEME', payload: value });
  }

  const setWeight = (value) => {
    dispatch({ type: 'SETWEIGHT', payload: value });
  }

  const setFitness = (value) => {
    dispatch({ type: 'SETFITNESS', payload: value });
  }

  const setPFP = (value) => {
    dispatch({ type: 'SETPFP', payload: value });
  }

  const setExercises = (value) => {
    dispatch({ type: 'SETEXERCISES', payload: value });
  }

  const handleSubmit = () => {
    // The find method looks through an array until the find condition is fulfilled, then one element
    // gets assigned to the element in which that condition was true
    const matchingUser = allUsers.find(user => username.toLowerCase() === user.username.toLowerCase() && password === user.password);
    if (matchingUser) {
      selectUser(matchingUser._id);
      setTheme(matchingUser.lightmodeToggle);
      setWeight(matchingUser.weightArray.at(-1).weight);
      setFitness(matchingUser.fitnessLevel);
      setPFP(matchingUser.pfp)
      setExercises(matchingUser.exercises)
      navigate('/HomePage');
    } else {
      let newHelper = {
        username:"",
        password: "Username and Password don't match"
      }
      setHelperTexts(newHelper);
      setIsError(true);
    }
  }


  return (
    <Stack>
      <Typography fontSize={36}>Log in to your account</Typography>
      <Stack spacing={2} alignItems="flex-start" sx={{ width: 300, margin: 'auto', mt: 5 }}>
        <Typography>Username:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isError}
          helperText={helperTexts.username}
        />
        <Typography>Password:</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isError}
          helperText={helperTexts.password}
        />
      </Stack>
      <Stack alignItems={"center"}>
        <Button variant="contained" onClick={handleSubmit} sx={{mt: 5, width: "40%"}}>
          Log In
        </Button>
        <br/>
        <Typography>Don't have an account?</Typography>
        <MuiLink sx={linkStyling} to="./CreateAccount" component={RouterLink}>
            Sign Up
        </MuiLink>
      </Stack>
      
    </Stack>
  );
}

export default LoginPage;