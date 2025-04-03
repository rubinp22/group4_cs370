import { Stack, Card, Typography, Button, TextField, InputAdornment, CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

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

function ProfilePage() {
    const [editingData, setEditingData] = useState(false);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFeetIn, setHeightFeetIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    const [pfpIn, setPfpIn] = useState(undefined);
    
    const [ProfileData, setProfileData] = useState([]);

    // This new state is accessed by the error attribute for each Textfield
    const [errors, setErrors] = useState({
        name: false,
        heightFeet: false,
        heightInch: false,
        weight: false,
        description: false,
        pfp: false
    })

    const name = ProfileData.map(data => data.name);
    const heightFeet = ProfileData.map(data => data.heightFeet);
    const heightInch = ProfileData.map(data => data.heightInch);
    const weight = ProfileData.map(data => data.weight);
    const description = ProfileData.map(data => data.description);
    const pfp = ProfileData.map(data => data.pfp);

    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
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
            setProfileData([])
            setProfileData(prevData => [
                ...prevData,
                {
                    name: nameIn,
                    heightFeet: heightFeetIn,
                    heightInch: heightInchIn,
                    weight: weightIn,
                    description: descriptionIn,
                    pfp: pfpIn
                }
            ])

            {/*const newProfile = {
                // Types: run, hike, cycle, swim, weights
                name: nameIn,
                exercises: [],
                friends: [],
                goals: [],
                achievements: [],
                bmi: 20,
                username: 'username',
                password: 'password',
                fitnessLevel: 0,
                heightFeet: heightFeetIn,
                heightInch: heightInchIn,
                weight: []
            }

            await axios.post('http://localhost:3000/users/', newProfile, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });*/}

        }
    }

    useEffect(() => {
        getProfileData();

        async function getProfileData() {
            const res = await axios.get('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    name: "Bob"
                }
            });
            setProfileData([])
            setProfileData(res.data);
        }
    
    }, [])

    // Checking if text field input is either undefined, less than 1, or greater than the specified range
    // If an error is found, this function returns true, preventing handleSubmit from storing the erroneous data
    // in state.
    function isError() {
        // Making a new object with values equal to whether or not the input state meets certain conditions
        // Will result in an object that holds Boolean values
        let newErrors = {
            name: (nameIn === undefined || nameIn.length > 30 || nameIn.length < 1),
            heightFeet: (heightFeetIn === undefined || heightFeetIn > 7 || heightFeetIn < 1),
            heightInch: (heightInchIn === undefined || heightInchIn > 11 || heightInchIn < 0),
            weight: (weightIn === undefined || weightIn > 1000 || weightIn < 0),
            description: (description != undefined && description.length > 200),
            pfp: (pfp === undefined && pfp > 0 && pfp < 16)
        }

        // Since we now have state for errors, we set it equal to the the values found within the object newErrors
        // If any of the above conditions are true, the corresponding text field will enter an error state, indicating
        // to the user that they entered erroneous input
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
        
        <Stack>
            <Grid container spacing={2}>
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

        {/*Stats*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="flex-start" size={8} spacing={0}>  
          <Card sx={{p: 1}}>
            <p>Height: {heightFeet}'{heightInch}" | Weight: {weight} kg</p>
            <p>{description}</p>
          </Card>
        </Grid>
        
        {/*Friends*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="center" size={4} spacing={0}>
        <Card sx={{p: 1}}>
          <h3>Friends</h3>
          <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="/images/profileImages/profile10.png"/>
          <Avatar alt="Travis Howard" src="/images/profileImages/profile2.png" />
          <Avatar alt="Cindy Baker" src="/images/profileImages/profile3.png" />
          <Avatar alt="Agnes Walker" src="/images/profileImages/profile4.png" />
          <Avatar alt="Trevor Henderson" src="/images/profileImages/profile5.png" />
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
                            defaultValue={name}
                            onChange={(e) => setnameIn(e.target.value)}
                        />
                        <TextField 
                            required
                            label="Profile"
                            defaultValue={pfp}
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
                                defaultValue={heightFeet}
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
                                defaultValue={heightInch}
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
                            defaultValue={weight}
                            type="number"
                            onChange={(e) => setWeightIn(e.target.value)}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>kg</InputAdornment>
                            }}
                        />
                        <TextField 
                            variant="filled" 
                            label="Description"
                            error={errors.description}
                            value={descriptionIn}
                            multiline
                            maxRows={4}
                            defaultValue={description}
                            onChange={(e) => setDescriptionIn(e.target.value)}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                    </Stack>
                </Card>
            )}
        </Stack>

        {/*Buttons*/}
        <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
            <Button variant="contained" 
                onClick={handleEdit}
            >
                {editingData ? "Stop Editing" : "Edit"}
            </Button>
            <MuiLink to="/" component={RouterLink} className="button-link">Home</MuiLink>
        </Stack>
    </Stack>

    );
}

export default ProfilePage


