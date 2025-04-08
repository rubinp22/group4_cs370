
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import GlobalStateContext from "../contexts/GlobalStateContext";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [isError, setIsError] = useState(false);

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

  const handleSubmitTest = () => {
    // The find method looks through an array until the find condition is fulfilled, then one element
    // gets assigned to the element in which that condition was true
    const matchingUser = allUsers.find(user => username === user.username && password === user.password);
    if (matchingUser) {
      console.log("logging in as user: ", matchingUser);
      selectUser(matchingUser._id);
      setTheme(matchingUser.lightmodeToggle);
      setWeight(matchingUser.weightArray.at(-1).weight);
      setFitness(matchingUser.fitnessLevel);
      navigate('/HomePage');
    } else {
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
        />
        <Typography>Password:</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isError}
        />
      </Stack>
      <Stack alignItems={"center"}>
        <Button variant="contained" onClick={handleSubmitTest} sx={{mt: 5, width: "40%"}}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;