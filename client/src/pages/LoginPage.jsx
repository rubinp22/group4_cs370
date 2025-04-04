
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
    if (username === 'user' && password === 'admin') {
      navigate('/HomePage');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <Stack spacing={2} alignItems="flex-start" sx={{ width: 300, margin: 'auto', mt: 10 }}>
      <Typography
  variant="h3"
  sx={{
    color: amber[500],
    fontWeight: 800,
    fontFamily: '"Open Sans", serif',
    letterSpacing: 1.5,
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  }}
>
  Login Page
</Typography>
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
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
}

export default LoginPage;