import { Link as RouterLink } from 'react-router-dom';
import GlobalStateContext from '../contexts/GlobalStateContext.jsx';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MuiLink from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import { Stack, Card, Typography } from '@mui/material';
import ToolBar from '../components/ToolBar.jsx';

function AllProfiles() {
    const { state, dispatch } = useContext(GlobalStateContext);
    const [allUsers, setAllUsers] = useState([]);

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

    return (
      <>
        <ToolBar /> {/* add new elements */}
        <Stack>
        <Grid container spacing={1}>
            <Grid size={12}>
            <Typography fontSize={24} marginBottom={3}>All Users</Typography>
            </Grid>
            {allUsers.map((option) => (
            <Grid size={{xs:6,sm:6,md:3,lg:3}}>
                <MuiLink to={`../HomePage/profile/${option._id}`} component={RouterLink} className="button-link" sx={{width:165}}>
                  <Avatar alt={option.name} src={option.pfp} />
                  {option.name}
                </MuiLink> 
            </Grid>
            ))}
        </Grid>

        <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
            <MuiLink to={`../HomePage/profile/${state.user}`} component={RouterLink} className="button-link">Back to My Profile</MuiLink>
            <MuiLink to="../HomePage" component={RouterLink} className="button-link">Home</MuiLink>
        </Stack>

        </Stack>
     </>  
    );
} 

export default AllProfiles