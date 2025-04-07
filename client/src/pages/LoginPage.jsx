
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import axios from 'axios';

import GlobalStateContext from "../contexts/GlobalStateContext";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  let userID = "";

  const [isError, setIsError] = useState(false);

// input default credentials with admin and user values
// uses an onclick method for using the correct input
// its should allow you to save credentials

useEffect(() => {
  async function getProfileData() {
    try {
      const res = await axios.get('http://localhost:3000/users', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: { }
      });
      setAllUsers(res.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }

  }
  getProfileData();
}, []);

// console.log("allUsers: ", allUsers);

  const handleSubmit = () => {
    if (username === 'user' && password === 'password') {
      navigate('/HomePage');
    } else {
      alert('Incorrect username or password');
    }
  };

  const { state, dispatch } = useContext(GlobalStateContext);

  const selectUser = (value) => {
    dispatch({ type: 'SETUSER', payload: value });
  }

  const setTheme = (value) => {
    dispatch({ type: 'SETTHEME', payload: value });
  }

  const handleSubmitTest = () => {
    const matchingUser = allUsers.find(user => username === user.name && password === user.password);
    if (matchingUser) {
      console.log("logging in as user: ", matchingUser);
      selectUser(matchingUser._id);
      setTheme(matchingUser.lightmodeToggle);
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
        <Button variant="contained" onClick={handleSubmit} sx={{mt: 5, width: "40%"}}>
          Submit
        </Button>
        <Button variant="contained" onClick={handleSubmitTest} sx={{mt: 5, width: "40%"}}>
          Submit Test
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;