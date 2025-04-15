import { Stack, Card, Typography, Button, TextField, InputAdornment, Chip } from '@mui/material';
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
import Profile from '../../../api/models/Profile.js';

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
    const [profileData, setProfileData] = useState([]);
    const [achievementData, setAchievementData] = useState([]);
    const [earnedAchievements, setEarnedAchievements] = useState([]);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFeetIn, setHeightFeetIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    const [pfpIn, setPfpIn] = useState(undefined);

    const name = profileData.map(data => data.name);
    const heightFeet = profileData.map(data => data.heightFeet);
    const heightInch = profileData.map(data => data.heightInch);
    const weight = profileData.map(data => data.weight);
    const description = profileData.map(data => data.description);
    const pfp = profileData.map(data => data.pfp);

    const textInputSpacing = 3;

    // Fetching all data that belongs to the user
    async function getProfileData() {
        try {
            const res = await axios.get('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    _id: pageID
                }
            });
            setProfileData(res.data);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }
    

    // Fetching the data of all achievements from the DB (name, category, metric, requirement,)
    async function getAchievementData() {
        try {
            const res = await axios.get('http://localhost:3000/achievements', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { }
            });
            setAchievementData(res.data);
            return res.data;
        } catch (err) {
            console.error('Error fetching user achievements', err);
        }
    }

    // This function is meant to put all a user's exercise data into an easy-to-understand object
    // It will either hold a metric's sum or max depending on the context
    // Once all exercise metric data is in one object, we are able to use that data to determine
    // which achievements a user has earned!
    async function sumUserMetrics(profileData) {
        const exerciseIDs = profileData[0].exercises

        let metrics = {
            distance: {
                run: 0,
                cycle: 0
            },
            duration: {
                run: 0,
                cycle: 0
            },
            elevationGain: 0,
            elevationLoss: 0,
            // Revisit lap times when I know exactly how to interpret the achievement requirements
            maxHeartRate: 1,
            reps: 0,
            sets: 0,
            steps: 0,
            weightOfWeights: 0
        }

        // Didn't realize you could mark a map function as async!
        const exercisePromises = exerciseIDs.map(async (ID, idx) => {
            try {
                const res = await axios.get('http://localhost:3000/exercises', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { _id: ID }
                });
                const currentExercise = res.data[0];

                if (currentExercise.type === "run") {
                    metrics.distance.run += currentExercise.distance;
                    metrics.duration.run += currentExercise.duration;   
                } else if (currentExercise.type === "hike") {
                    metrics.elevationGain += currentExercise.elevationGain;
                } else if (currentExercise.type === "cycle") {
                    metrics.distance.cycle += currentExercise.distance;
                    metrics.duration.cycle += currentExercise.duration;
                } else if (currentExercise.type === "swim") {
                    // Add behavior here
                } else if (currentExercise.type === "weights") {
                    metrics.reps += currentExercise.reps;
                    metrics.sets += currentExercise.sets;
                    metrics.weightOfWeights += currentExercise.weightOfWeights;
                }

                if (metrics.maxHeartRate < currentExercise.maxHeartRate) {
                    metrics.maxHeartRate = currentExercise.maxHeartRate;
                }

            } catch (err) {
                console.error('Error fetching user exercises', err);
            }
        });

        // I had an issue where I was returning metrics before my asynchronous calls to map could 
        // finish. So I was just returning the metrics object with its default values. 
        // Each time our async map gets called, exercisePromises (an array of promises) gains a new promise. 
        // Each time we successully query data that is represented by a promise, it gets resolved. This line
        // causes the program to wait until exercsisePromises is an array full of resolved promises. 
        await Promise.all(exercisePromises);

        return metrics;
    }

    async function achievementCheck() {
        const profileData = await getProfileData();
        const achievementData = await getAchievementData();
        const metrics = await sumUserMetrics(profileData);

        const earnedBadges = [];

        achievementData.map((achievement, idx) => {
            const category = achievement.category;
            const metric = achievement.metric;
            // This check exists because there are achievements that measure distance and duration for both
            // running and cycling
            if (category === "distance" || category === "duration") {

                if (metrics[category][metric] >= achievement.requirement) {
                    earnedBadges.push(achievement.name);
                }

            // This check is for all other achievements
            } else if (metrics[category] >= achievement.requirement) {
                earnedBadges.push(achievement.name);
            }
        })

        return earnedBadges;
    }

    // getting profile and achievement data from the database
        useEffect(() => {
            async function fetchAchievements() {
                const achievementsEarned = await achievementCheck();
                setEarnedAchievements(achievementsEarned);
            }

            fetchAchievements();
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
            <Grid container spacing={1}>
                {/*Profile picture*/}
                <Grid display="flex" justifyContent="left" alignItems="left" size="auto"> 
                    <Avatar
                    sx={{ width: 100, height: 100}}
                    alt={name}
                    src={pfp}
                    ></Avatar>
                </Grid>

                {/*Name*/}
                <Grid display="flex" justifyContent="flex-start" alignItems="center" size={8}>
                    <Typography fontSize={24}>{name}</Typography>
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

                {/*Achievements*/}
                <Grid size={4}>
                    <Card sx={{ pb: 3 }}>
                    <h3>Achievements</h3>
                        {earnedAchievements.map((achievement, idx) => {
                            return (
                                <Chip
                                    key={idx}
                                    label={achievement}
                                />
                            )
                        })}
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

                            <Stack direction="row">
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
                                    sx={{width: "50%"}}
                                    
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
                                    sx={{width: "50%"}}
                                />
                                </Stack>
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


