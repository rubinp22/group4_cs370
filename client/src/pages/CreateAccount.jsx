
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

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

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
  
  const handleSubmit = () => {
    // check if user already exists then update username error
    const matchingUser = allUsers.find(user => username === user.username);
    setIsUsernameError(matchingUser);
    // check if password is defined
    setIsPasswordError(password === "");

    if (!isUsernameError && !isPasswordError) {
        createUser();
        setAccountCreated(true);
    }
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
      <Typography fontSize={36}>Create New Account</Typography>
      <Stack spacing={2} alignItems="flex-start" sx={{ width: 300, margin: 'auto', mt: 5 }}>
        <Typography>Username:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isUsernameError}
        />
        {isUsernameError ? (<Typography>That username is taken</Typography>) : (<></>)}
        <Typography>Password:</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isPasswordError}
        />
        {isPasswordError ? (<Typography>Please enter password</Typography>) : (<></>)}
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
            <Button variant="contained" onClick={handleSubmit} sx={{mt: 5, width: "40%"}}>
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