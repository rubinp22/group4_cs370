
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

// input default credentials with admin and user values
// uses an onclick method for using the correct input
// its should allow you to save credentials


  const handleSubmit = () => {
    if (username === 'user' && password === 'password') {
      navigate('/HomePage');
    } else {
      alert('Incorrect username or password');
    }
  };

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
        />
        <Typography>Password:</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>
      <Stack alignItems={"center"}>
        <Button variant="contained" onClick={handleSubmit} sx={{mt: 5, width: "40%"}}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;