import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import { Link as RouterLink, useParams } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import GlobalStateContext from '../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';

const profilePictures = [
    {
        value: '/images/profileImages/profile1.png',
        label: 'Red and Yellow Rectangles',
    },
    {
        value: '/images/profileImages/profile4.png',
        label: 'Red and Yellow Semicircles',
    },
    {
        value: '/images/profileImages/profile5.png',
        label: 'Red and Yellow Grid',
    },
    {
        value: '/images/profileImages/profile6.png',
        label: 'Red and Yellow Quarter Circles',
    },
    {
        value: '/images/profileImages/profile9.png',
        label: 'Red and Yellow Diamonds',
    },
    {
        value: '/images/profileImages/profile2.png',
        label: 'Purple and Black Waves',
    },
    {
        value: '/images/profileImages/profile3.png',
        label: 'Pink and Cyan Waves',
    },
    {
        value: '/images/profileImages/profile8.png',
        label: 'Pink and Cyan Squiggles',
    },
    {
        value: '/images/profileImages/profile14.png',
        label: 'Pink and Cyan Stars',
    },
    {
        value: '/images/profileImages/profile7.png',
        label: 'Purple and Green Stars',
    },
    {
        value: '/images/profileImages/profile10.png',
        label: 'Purple and Green Squiggles',
    },
    {
        value: '/images/profileImages/profile12.png',
        label: 'Purple and Green Trapezoids',
    },
    {
        value: '/images/profileImages/profile13.png',
        label: 'Cyan and Green Circles',
    },
    {
        value: '/images/profileImages/profile11.png',
        label: 'Yellow and Pink Circles',
    },
    {
        value: '/images/profileImages/profile15.png',
        label: 'Yellow and Cyan Grid',
    },
  ];

  const defaultFriends = [
    {
        name:"Remy Sharp",
        pfp:"/images/profileImages/profile10.png",
    },
    {
        name:"Travis Howard",
        pfp:"/images/profileImages/profile2.png",
    },
    {
        name:"Cindy Baker",
        pfp:"/images/profileImages/profile3.png",
    },
    {
        name:"Agnes Walker",
        pfp:"/images/profileImages/profile4.png",
    },
    {
        name:"Trevor Henderson",
        pfp:"/images/profileImages/profile5.png",
    },
];

function ProfilePage() {
    // taking the id from the dynamic route 
    const { pageID } = useParams();
    // global state
    const { state, dispatch } = useContext(GlobalStateContext)

    const [editingData, setEditingData] = useState(false);
    const [ProfileData, setProfileData] = useState([]);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFeetIn, setHeightFeetIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    const [pfpIn, setPfpIn] = useState(undefined);

    const name = ProfileData.map(data => data.name);
    const heightFeet = ProfileData.map(data => data.heightFeet);
    const heightInch = ProfileData.map(data => data.heightInch);
    const weight = ProfileData.map(data => data.weight);
    const description = ProfileData.map(data => data.description);
    const pfp = ProfileData.map(data => data.pfp);

    const textInputSpacing = 3;

    async function getProfileData() {
        const res = await axios.get('http://localhost:3000/users', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            params: {
                _id: pageID
            }
        });
        //setProfileData([])
        setProfileData(res.data);
    }
    
    // getting profile data from the database
    useEffect(() => {
        getProfileData();
    }, [])

    // input field errors, all set to false by default
    const [errors, setErrors] = useState({
        name: false,
        heightFeet: false,
        heightInch: false,
        weight: false,
        description: false,
        pfp: false
    })

    function handleEdit() {
        if (editingData === false) {
            // reset input values
            {/*if (nameIn === undefined) {
                setnameIn(name);
                setHeightFeetIn(heightFeet);
                setHeightInchIn(heightInch);
                setWeightIn(weight.at(-1));
                setDescriptionIn(description);
                setPfpIn(pfp);
            }*/}
            setEditingData(true);
        } else {
            setEditingData(false);
        }
    }

    function handleClear() {
        setnameIn("");
        setHeightFeetIn("");
        setHeightInchIn("");
        setWeightIn("");
        setDescriptionIn("");
        setPfpIn("");
    }

    async function handleSubmit() {
        if (!isError()) {
            const updatedData = {
                _id: pageID,
                name: nameIn,
                heightFeet: heightFeetIn,
                heightInch: heightInchIn,
                description: descriptionIn,
                pfp: pfpIn
            }

            // update the database
            await axios.put('http://localhost:3000/users/', updatedData)
            getProfileData();
        }
    }

    // check for errors
    function isError() {

        let newErrors = {
            name: (nameIn === undefined || nameIn.length > 30 || nameIn.length < 1),
            heightFeet: (heightFeetIn === undefined || heightFeetIn > 7 || heightFeetIn < 1),
            heightInch: (heightInchIn === undefined || heightInchIn > 11 || heightInchIn < 0),
            weight: (weightIn === undefined || weightIn > 1000 || weightIn < 0),
            description: (description != undefined && description.length > 200),
            pfp: (pfp === undefined)
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
    

    return (
        
        <Stack spacing={2}>
        <Grid container spacing={4}>
        {/*Profile picture*/}
        <Grid display="flex" justifyContent="left" alignItems="left" size="auto"> 
            <Avatar
            sx={{ width: 100, height: 100}}
            alt={name}
            src={pfp}
            ></Avatar>
        </Grid>

        {/*Name*/}
        <Grid display="flex" justifyContent="flex-start" alignItems="left" size={8}>
            <h2>{name}</h2>
        </Grid>

        <br/>

        {/*Bio*/}
        <Grid size={{xs:8,sm:7.5,md:7.6}} spacing={4} alignItems="left" justifyContent="left">  
        <Card sx={{p: 2}} align='left'>
            <Typography variant="body2">
            Height: {heightFeet}'{heightInch}" | Weight: {weight} kg
            </Typography>
            <Typography variant="body">
            {description}
            </Typography>
        </Card>
        </Grid>
    
        
        {/*Friends*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="center" size={4} spacing={0}>
         <Card sx={{p: 1}}>
          <h3>Friends</h3>
          <AvatarGroup max={4}>
            {defaultFriends.map((friend) => (
                <Avatar alt={friend.name} src={friend.pfp}></Avatar>
            ))}
          </AvatarGroup>
         </Card>
        </Grid>
            
        </Grid>

        {/*Editing Form*/}
        <Stack>
            {!editingData ? (
                <></>
            ) : (
                <Card sx={{ padding:"40px"}}>
                    <Typography marginBottom={5} fontSize={24}>Edit Profile</Typography>
                    <Stack direction="column" spacing={textInputSpacing}>
                        <TextField 
                            required
                            variant="filled" 
                            label="Name"
                            error={errors.name}
                            value={nameIn}
                            onChange={(e) => setnameIn(e.target.value)}
                        />
                        <TextField 
                            required
                            variant="filled"
                            label="Profile"
                            value={pfpIn}
                            select
                            onChange={(e) => setPfpIn(e.target.value)}
                        >
                            {profilePictures.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                              
                        </TextField>

                        <Box>
                            <TextField 
                                required
                                variant="filled" 
                                label="Height"
                                error={errors.heightFeet}
                                value={heightFeetIn}
                                type="number"
                                onChange={(e) => setHeightFeetIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>Ft</InputAdornment>
                                }}
                            />
                            <TextField 
                                required
                                variant="filled" 
                                error={errors.heightInch}
                                value={heightInchIn}
                                type="number"
                                onChange={(e) => setHeightInchIn(e.target.value)}
                                InputProps={{ 
                                    endAdornment: <InputAdornment position='end'>In</InputAdornment>
                                }}
                            />
                            </Box>
                        <TextField 
                            required
                            variant="filled"
                            label="Weight" 
                            error={errors.weight}
                            value={weightIn}
                            type="number"
                            onChange={(e) => setWeightIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>lbs</InputAdornment>
                            }}
                        />
                        <TextField 
                            variant="filled" 
                            label="Description"
                            error={errors.description}
                            value={descriptionIn}
                            multiline
                            maxRows={4}
                            onChange={(e) => setDescriptionIn(e.target.value)}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                        <Button variant="contained" onClick={handleSubmit}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                    </Stack>
                </Card>
            )}
        </Stack>

        {/*Buttons*/}
        <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
            {state.user === pageID ? (
                <Button variant="contained" 
                onClick={handleEdit}>
                {editingData ? "Stop Editing" : "Edit"}
                </Button>
            ) : (
            <></>)}
            <MuiLink to="../HomePage/AllProfiles" component={RouterLink} className="button-link">All Profiles</MuiLink>
            <MuiLink to="../HomePage" component={RouterLink} className="button-link">Home</MuiLink>
        </Stack>
    </Stack>

    );
}

export default ProfilePage


