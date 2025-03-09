import { Link } from 'react-router-dom';
import { Stack, Card, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


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

function ProfilePage() {
    const [editingData, setEditingData] = useState(false);

    const [nameIn, setnameIn] = useState(undefined);
    const [heightFtIn, setHeightFtIn] = useState(undefined);
    const [heightInchIn, setHeightInchIn] = useState(undefined);
    const [weightIn, setWeightIn] = useState(undefined);
    const [descriptionIn, setDescriptionIn] = useState(undefined); 
    
    const [ProfileData, setProfileData] = useState([]);

    // This new state is accessed by the error attribute for each Textfield
    const [errors, setErrors] = useState({
        name: false,
        heightFt: false,
        heightInch: false,
        weight: false,
        description: false
    })

    const name = ProfileData.map(data => data.name);
    const heightFt = ProfileData.map(data => data.heightFt);
    const heightInch = ProfileData.map(data => data.heightInch);
    const weight = ProfileData.map(data => data.weight);
    const description = ProfileData.map(data => data.description)

    const textInputSpacing = 3;

    function handleEdit() {
        editingData ? setEditingData(false) : setEditingData(true)
    }

    function handleReset() {
        setProfileData([])
    }

    function handleClear() {
        setnameIn("");
        setHeightFtIn("");
        setHeightInchIn("");
        setWeightIn("");
        setDescriptionIn("");
    }

    function handleSubmit() {
        if (!isError()) {
            setProfileData([])
            setProfileData(prevData => [
                ...prevData,
                {
                    name: nameIn,
                    heightFt: heightFtIn,
                    heightInch: heightInchIn,
                    weight: weightIn,
                    description: descriptionIn
                }
            ])
        }
    }

    // Checking if text field input is either undefined, less than 1, or greater than the specified range
    // If an error is found, this function returns true, preventing handleSubmit from storing the erroneous data
    // in state.
    function isError() {
        // Making a new object with values equal to whether or not the input state meets certain conditions
        // Will result in an object that holds Boolean values
        let newErrors = {
            name: (nameIn === undefined || nameIn.length > 30 || nameIn.length < 1),
            heightFt: (heightFtIn === undefined || heightFtIn > 7 || heightFtIn < 1),
            heightInch: (heightInchIn === undefined || heightInchIn > 11 || heightInchIn < 0),
            weight: (weightIn === undefined || weightIn > 1000 || weightIn < 0),
            description: (description != undefined && description.length > 200)
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
                src=""
                ></Avatar>
            </Grid>

            {/*Name*/}
            <Grid display="flex" justifyContent="flex-start" alignItems="left" size={8}>
                <h2>{name}</h2>
            </Grid>

            <br/>

        {/*Stats*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="flex-start" size={8} spacing={0}>  
          <Item>
            <p>Height: {heightFt}'{heightInch}" | Weight: {weight}</p>
            <p>{description}</p>
          </Item>
        </Grid>
        
        {/*Friends*/}
        <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="center" size={4} spacing={0}>
          <Item>
          <h3>Friends</h3>
          <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
          </Item>
        </Grid>
            
        </Grid>

        {/*Editing Form*/}
        <Stack>
            {!editingData ? (
                <></>
            ) : (
                <Card sx={{ padding:"40px", backgroundColor:"#828c85"}}>
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
                        <Box>
                            <TextField 
                                required
                                variant="filled" 
                                label="Height"
                                error={errors.heightFt}
                                value={heightFtIn}
                                defaultValue={heightFt}
                                type="number"
                                onChange={(e) => setHeightFtIn(e.target.value)}
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
            <Link to="/" className="button-link">Home</Link>
        </Stack>
    </Stack>

    );
}

export default ProfilePage


