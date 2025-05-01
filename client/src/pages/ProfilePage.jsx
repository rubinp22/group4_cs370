import { Stack, Card, Typography, Button, TextField, InputAdornment, Chip, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import { Link as RouterLink, useParams } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import ToolBar from '../components/ToolBar';
import GlobalStateContext from '../contexts/GlobalStateContext.jsx';
import React, { useContext } from 'react';
import Profile from '../../../api/models/Profile.js';
import ListItemIcon from '@mui/material/ListItemIcon';
import MyActivityCalendar from '../components/MyActivityCalendar.jsx';

import ProfilePictures from '../data/ProfilePictures.jsx';

function ProfilePage() {
    // taking the id from the dynamic route 
    const { pageID } = useParams();
    // global state
    const { state, dispatch } = useContext(GlobalStateContext)

    const [editingData, setEditingData] = useState(false);
    const [profileData, setprofileData] = useState([]);
    const [achievementData, setAchievementData] = useState([]);
    const [earnedAchievements, setEarnedAchievements] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [exercisesByDate, setExercisesByDate] = useState(null);
    const [friends, setFriends] = useState([]);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFeetIn, setHeightFeetIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    const [pfpIn, setPfpIn] = useState(undefined);

    const name = profileData.map(data => data.name);
    const heightFeet = profileData.map(data => data.heightFeet);
    const heightInch = profileData.map(data => data.heightInch);
    const weight = profileData.map(data => data.weightArray.at(-1).weight);
    const weightArray = profileData.map(data => data.weightArray)
    const description = profileData.map(data => data.description);
    const pfp = profileData.map(data => data.pfp);

    const textInputSpacing = 3;

    // Fetching all data that belongs to the user
    async function getprofileData() {
        try {
            const res = await axios.get('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json'
                }, 
                params: {
                    _id: pageID
                }
            });
            setprofileData(res.data);
            getFriendData(res.data.at(0).friends);
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

    async function getFriendData(friendIds) {
        const newFriends = [];
        friendIds.forEach(async id => {
            try {
                const res = await axios.get('http://localhost:3000/users', {
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    params: {
                        _id: id
                    }
                });
                let newFriend = {
                    name: res.data.at(0).name,
                    pfp: res.data.at(0).pfp
                }
                newFriends.push(newFriend);
            } catch (err) {
                console.log(err);
            }
        })
        setFriends(newFriends);
        console.log(newFriends);
    }
    
    async function getUserExercises() {
        try {
            const res = await axios.get('http://localhost:3000/exercises', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    userID: pageID
                }
            });
            setUserExercises(res.data);
            //console.log("getUserExercises returning: ", res.data);
            return res.data;
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
    async function sumUserMetrics(userExercises) {
        let metrics = {
            distance: {
                run: 0,
                cycle: 0,
                hike: 0
            },
            duration: {
                run: 0,
                cycle: 0,
                hike: 0
            },
            elevationGain: {
                cycle: 0,
                hike: 0
            },
            elevationLoss: 0,
            maxHeartRate: 1,
            steps: 0,
            maxWeightOfWeights: 0,
            totalVolume: 0,
            totalReps: 0,
            lapCount: 0,
            totalLapTime: 0,
            totalStrokes: 0
        }

        userExercises.map((data, idx) => {

            if (data.type === "run") {
                metrics.distance.run += data.distance;
                metrics.duration.run += data.duration;
                metrics.steps += data.steps;
            } else if (data.type === "hike") {
                metrics.elevationGain.hike += data.elevationGain;
                metrics.distance.hike += data.distance;
                metrics.duration.hike += data.duration;
            } else if (data.type === "cycle") {
                metrics.distance.cycle += data.distance;
                metrics.duration.cycle += data.duration;
                metrics.elevationGain.cycle += data.elevationGain;
            } else if (data.type === "swim") {
                metrics.lapCount += data.lapCount;
                data.lapTimes.map((data, idx) => {
                    metrics.totalLapTime += data;
                })
                data.strokeCount.map((data, idx) => {
                    metrics.totalStrokes += data
                })
            } else if (data.type === "weights") {
                metrics.totalReps += (data.reps * data.sets);
                if (metrics.maxWeightOfWeights < data.weightOfWeights) {
                    metrics.maxWeightOfWeights = data.weightOfWeights
                }
                metrics.totalVolume += (data.reps * data.sets * data.weightOfWeights);

            }

            if (metrics.maxHeartRate < data.maxHeartRate) {
                metrics.maxHeartRate = data.maxHeartRate;
            }
        })

        return metrics;
    }

    async function achievementCheck() {
        const profileData = await getprofileData();
        const userExercises = await getUserExercises();
        const achievementData = await getAchievementData();
        const metrics = await sumUserMetrics(userExercises);

        const earnedBadges = [];

        achievementData.map((achievement, idx) => {
            const category = achievement.category;
            const metric = achievement.metric;
            // This check exists because there are achievements that measure distance and duration for 
            // Running, Cycling, and Hiking
            if (category === "distance" || category === "duration") {

                if (metrics[category][metric] >= achievement.requirement) {
                    earnedBadges.push(achievement);
                }

            // This check is for all other achievements
            } else if (metrics[category] >= achievement.requirement) {
                earnedBadges.push(achievement);
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
            weightArray.push({weight: weightIn, dateLogged: Date.now()});
            let weightArrayIn = weightArray.flat();
            const updatedData = {
                _id: pageID,
                name: nameIn,
                heightFeet: heightFeetIn,
                heightInch: heightInchIn,
                description: descriptionIn,
                pfp: pfpIn,
                weightArray: weightArrayIn
            }

            dispatch({ type: 'SETWEIGHT', payload: weightArrayIn.at(-1).weight });
            dispatch({ type: 'SETPFP', payload: pfpIn});
            // update the database
            await axios.put('http://localhost:3000/users/', updatedData)
            getprofileData();
        }
    }

    // check for errors
    function isError() {

        let newErrors = {
            name: (nameIn === undefined || nameIn.length > 30 || nameIn.length < 1),
            heightFeet: (heightFeetIn === undefined || heightFeetIn > 7 || heightFeetIn < 1),
            heightInch: (heightInchIn === undefined || heightInchIn > 11 || heightInchIn < 0),
            weight: (weightIn === undefined || weightIn > 1000 || weightIn < 1),
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

    function collectExerciseDates() {
        //console.log("userExercises: ", userExercises);

        let exerciseDates = [ ];

        userExercises.map((exercise, idx) => {
            //console.log("exercise ", idx + 1, " date: ", exercise.date.substring(0, 10));
            let currentDate = exercise.date.substring(0, 10);
            let uniqueDate = true;

                exerciseDates.map((data, idx) => {
                    if (data.date === currentDate) {
                        data.count++;
                        if (data.count === 1) {
                            data.level = 2;
                        } else if (data.count === 2) {
                            data.level = 3
                        } else if (data.count >= 3) {
                            data.level = 4
                        } 

                        uniqueDate = false;
                    } 
                })

                if (uniqueDate) {
                    exerciseDates.push({
                        date: currentDate,
                        count: 1,
                        level: 1
                    })
                }

        })

        //console.log("exerciseDates: ", exerciseDates);
        setExercisesByDate(exerciseDates);

    }

    useEffect(() => {
        if (!userExercises || userExercises.length === 0) return;
        collectExerciseDates();
      }, [userExercises]);
    

    return (
        <>
        <ToolBar /> {/* add new elements */}
        <Stack>
              <Grid container spacing={2} marginBottom={2}>
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
            <Card sx={{p: 2, height: '100%'}} align='left'>
                <Typography variant="body2">
                Height: {heightFeet}'{heightInch}" | Weight: {weight} lbs
                </Typography>
                <Typography variant="body">
                {description}
                </Typography>
            </Card>
            </Grid>
    
        
        {/*Friends*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="center" size={3} spacing={0}>
        <Card sx={{ p: 1, minWidth: '100%', display: 'flex', justifyContent: 'center'}} >
          <Box>
          <h3>Friends</h3>
          <AvatarGroup max={4}>
            {friends.map((friend) => (
                <Avatar alt={friend.name} src={friend.pfp}></Avatar>
            ))}
          </AvatarGroup>
          </Box>
         </Card>
        </Grid>

        {/*Achievements*/}
        <Grid size={4} sx={{ display: 'flex' }}>
            <Card sx={{ pb: 3, width: "100%"} }>
            <h3>Achievements</h3>
                {earnedAchievements.map((achievement, idx) => {
                    return (
                        <Tooltip title={achievement.tooltip}>
                            <Chip
                                key={idx}
                                label={achievement.name}
                            />
                        </Tooltip>

                    )
                })}
            </Card>
        </Grid>

        {/*Recent Activity*/}
        <Grid>
            <Card sx={{ padding: "2%", justifyItems: "center"}}>
                <Typography fontSize={24}>Recent Activity</Typography>
            {
            exercisesByDate?.length > 0 ? 
                <MyActivityCalendar data={exercisesByDate} levels={userExercises.length}/>
            : 
                <></>
            }
                
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
                                {ProfilePictures.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    <ListItemIcon>
                                        <Avatar
                                        src={option.value}
                                        alt={option.label}
                                        sx={{ width: 32, height: 32, marginRight: 4 }}
                                        />
                                    </ListItemIcon>
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
    </>
    );
}

export default ProfilePage


