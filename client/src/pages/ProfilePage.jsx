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
import { parseISO, compareAsc } from 'date-fns'

import ProfilePictures from '../data/ProfilePictures.jsx';

function ProfilePage() {
    // taking the id from the dynamic route 
    const { pageID } = useParams();
    // global state
    const { state, dispatch } = useContext(GlobalStateContext)

    const [editingData, setEditingData] = useState(false);
    const [savedData, setSavedData] = useState(false);
    const [profileData, setprofileData] = useState([]);
    const [achievementData, setAchievementData] = useState([]);
    const [earnedAchievements, setEarnedAchievements] = useState([]);
    const [userExercises, setUserExercises] = useState([]);
    const [exercisesByDate, setExercisesByDate] = useState(null);
    const [friends, setFriends] = useState([]);
    const [requestSent, setRequestSent] = useState(false);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFeetIn, setHeightFeetIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    const [pfpIn, setPfpIn] = useState(undefined);

    // Not ideal, but using map to like this turns all of these variables into an array
    // that holds one value. This broke the ability to edit a user profile. By indexing
    // to the first element, we eliminate this problem. Map however, is nice because it
    // doesn't throw errors when iterating over profileData when its empty, before the 
    // API promise is fulfilled. 
    const name = profileData.map(data => data.name)[0];
    const heightFeet = profileData.map(data => data.heightFeet)[0];
    const heightInch = profileData.map(data => data.heightInch)[0];
    const weight = profileData.map(data => data.weightArray.at(-1).weight)[0];
    const weightArray = profileData.map(data => data.weightArray)[0];
    const description = profileData.map(data => data.description)[0];
    const pfp = profileData.map(data => data.pfp)[0];

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
            
            const friendIDs = [];

            const requested = await axios.get('http://localhost:3000/friendrequests', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    requester: pageID,
                    accepted: true
                }
            })
            requested.data.forEach(friend => {
                friendIDs.push(friend.reciever);
            })

            const recieved = await axios.get('http://localhost:3000/friendrequests', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    reciever: pageID,
                    accepted: true
                }
            })
            recieved.data.forEach(friend => {
                friendIDs.push(friend.requester);
            })

            getFriendData(friendIDs);

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
        //console.log(newFriends);

        // check if user has already sent request to this page or if they're already friends
        if (pageID != state.user) {
            try {
                const res = await axios.get('http://localhost:3000/friendrequests', {
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    params: {
                        requester: state.user,
                        reciever: pageID
                    }
                });

                if (res.data.length != 0) {
                    setRequestSent(true);
                } else {
                    try {
                        const res = await axios.get('http://localhost:3000/friendrequests', {
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            params: {
                                requester: pageID,
                                reciever: state.user,
                                accepted: true
                            }
                        });
                        if (res.data.length != 0) {
                            setRequestSent(true);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
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

      const [helperTexts, setHelperTexts] = useState({
        username: "",
        password: "",
        name: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        description: ""
      })

    function handleEdit() {
        if (editingData === false) {
            // set input data to current values
            setnameIn(name);
            setHeightFeetIn(heightFeet);
            setHeightInchIn(heightInch);
            setWeightIn(weight);
            setDescriptionIn(description);
            setPfpIn(pfp);
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
            setSavedData(true);
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
            console.log("new data: ", updatedData);
            await axios.put('http://localhost:3000/users/', updatedData)
            getprofileData();
        }
        console.log("error data")
    }

    // check for errors
    function isError() {

        // let newErrors = {
        //     name: (nameIn === undefined || nameIn.length > 30 || nameIn.length < 1),
        //     heightFeet: (heightFeetIn === undefined || heightFeetIn > 7 || heightFeetIn < 1),
        //     heightInch: (heightInchIn === undefined || heightInchIn > 11 || heightInchIn < 0),
        //     weight: (weightIn === undefined || weightIn > 1000 || weightIn < 1),
        //     description: (description != undefined && description.length > 200),
        //     pfp: (pfp === undefined)
        // }

        let nameError = true;
        let nameHelper = "";
        if (nameIn === "") {
          nameHelper = "Please enter a name";
        } else if (nameIn.length > 30) {
          nameHelper = "Exceeded character limit of 30 by " + (name.length - 30);
        } else {
          nameError = false;
        }
      
        let heightFeetError = true;
        let heightFeetHelper = "";
        if (heightFeetIn === "") {
          heightFeetHelper = "Please enter Feet";
        } else if (heightFeetIn > 7 || heightFeetIn < 1) {
          heightFeetHelper = "Valid range: 1 - 7";
        } else {
          heightFeetError = false;
        }
      
        let heightInchesError = true;
        let heightInchesHelper = "";
        if (heightInchIn === "") {
          heightInchesHelper = "Please enter Inches";
        } else if (heightInchIn > 11 || heightInchIn < 0) {
          heightInchesHelper = "Valid range: 0 - 11";
        } else {
          heightInchesError = false;
        }
      
        let weightError = true;
        let weightHelper = "";
        if (weightIn === "") {
          weightHelper = "Please enter a weight";
        } else if (weightIn > 1000 || weightIn < 1) {
          weightHelper = "Valid range: 1 - 1000";
        } else {
          weightError = false;
        }
      
        let descriptionError = true;
        let descriptionHelper = "";
        if (descriptionIn === "") {
          descriptionHelper = "Please enter a description"
        } else if (descriptionIn.length > 200) {
          descriptionHelper = "Exceeded character limit of 200 by " + (descriptionIn.length - 200);
        } else {
          descriptionError = false;
        }
      
        let newHelper = {
          name: nameHelper,
          heightFeet: heightFeetHelper,
          heightInches: heightInchesHelper,
          weight: weightHelper,
          description: descriptionHelper
        }
      
        setHelperTexts(newHelper);
      
        let newErrors = {
          name: nameError,
          heightFeet: heightFeetError,
          heightInches: heightInchesError,
          weight: weightError,
          description: descriptionError
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

    async function handleFriendRequest() {
        const newRequest = {
            requester: state.user,
            reciever: pageID,
            accepted: false
        }
        // update the database
        await axios.post('http://localhost:3000/friendrequests/', newRequest);
        //handleSubmit();
        getprofileData();
        setRequestSent(true);
    }

    function collectExerciseDates() {
        //console.log("userExercises: ", userExercises);

        // The first date object will be invisible on the calendar, but it will set the starting range of the
        // calendar to the beginning of the year.
        let exerciseDates = [{
            date: '2025-01-01',
            count: 0,
            level: 0
        }];

        userExercises.map((exercise, idx) => {
            //console.log("exercise ", idx + 1, " date: ", exercise.date.substring(0, 10));
            let currentDate = exercise.date.substring(0, 10);
            let uniqueDate = true;

                exerciseDates.map((data, idx) => {
                    if (data.date === currentDate) {
                        data.count++;
                        if (data.count === 1) {
                            data.level = 1;
                        } else if (data.count === 2) {
                            data.level = 2
                        } else if (data.count === 3) {
                            data.level = 3;
                        } else if (data.count >= 4) {
                            data.level = 4;
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

        // The exerciseDates that get fed into the MyActivityCalendar component need to have their dates
        // be sorted in ascending order. The range of the dates on the calendar are determined by the 
        // first and last dates, so without sorting, we would run into issues where the calendar range
        // is smaller than the date range, resulting in missing data.
        exerciseDates.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

        // Inserting a dummy date object for the current day
        const today = new Date().toISOString().substring(0, 10);

        // We only want to insert dummy data for the current day if the user hasn't already
        // exercised today. We don't want to overwrite their data for today. 
        const exerciseToday = exerciseDates.find(date => today === date.date);
        if (!exerciseToday) {
            exerciseDates.push({
                date: today,
                count: 0,
                level: 0
            })
        }


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
                <Box justifyItems={'center'}>
                <h3>Friends</h3>
                <AvatarGroup max={4}>
                    {friends.map((friend) => (
                        <Avatar title={friend.name} src={friend.pfp}></Avatar>
                    ))}
                </AvatarGroup>
                <br/>
                {(requestSent || state.user === "" || state.user === pageID) ? (<></>) : 
                        (<Button variant="contained" onClick={handleFriendRequest}>Add</Button>)}
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
            <h3>Recent Activity</h3>
            {
            exercisesByDate?.length > 0 ? 
                <MyActivityCalendar data={exercisesByDate}/>
            : 
                <></>
            }
                
            </Card>

        </Grid>
        </Grid>


        {/*Editing Form*/}
        {!editingData ? (
            <></>
        ) : (
            <Stack>
            <br/>
            <Card sx={{ padding:"40px"}}>
                <Typography marginBottom={5} fontSize={24}>Edit Profile</Typography>
                <Stack direction="column" spacing={textInputSpacing}>
                    <TextField 
                        required
                        variant="filled" 
                        label="Name"
                        error={errors.name}
                        helperText={helperTexts.name}
                        value={nameIn}
                        onChange={(e) => {setnameIn(e.target.value); setSavedData(false)}}
                    />
                    <TextField 
                        required
                        variant="filled"
                        label="Profile"
                        value={pfpIn}
                        select
                        onChange={(e) => {setPfpIn(e.target.value); setSavedData(false)}}
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
                            helperText={helperTexts.heightFeet}
                            value={heightFeetIn}
                            type="number"
                            onChange={(e) => {setHeightFeetIn(e.target.value); setSavedData(false)}}
                            InputProps={{ 
                                endAdornment: <InputAdornment position='end'>Ft</InputAdornment>
                            }}
                            sx={{width: "50%"}}
                            
                        />
                        <TextField 
                            required
                            variant="filled" 
                            error={errors.heightInches}
                            helperText={helperTexts.heightInches}
                            value={heightInchIn}
                            type="number"
                            onChange={(e) => {setHeightInchIn(e.target.value); setSavedData(false)}}
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
                        helperText={helperTexts.weight}
                        value={weightIn}
                        type="number"
                        onChange={(e) => {setWeightIn(e.target.value); setSavedData(false)}}
                        InputProps={{ 
                            endAdornment: <InputAdornment position='end'>lbs</InputAdornment>
                        }}
                    />
                    <TextField 
                        variant="filled" 
                        label="Description"
                        error={errors.description}
                        helperText={helperTexts.description}
                        value={descriptionIn}
                        multiline
                        maxRows={4}
                        onChange={(e) => {setDescriptionIn(e.target.value); setSavedData(false)}}
                    />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5} marginTop={5}>
                <Button variant="contained" onClick={handleSubmit}>{savedData ? (<i>Saved</i>) : ("Save")}</Button>
                    <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                </Stack>
            </Card>
        </Stack>)}

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


