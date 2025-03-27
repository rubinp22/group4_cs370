import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// user goal page, should display current goals and allow them to create or delete goals

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

function UserGoals () {
  const goals = ['Exercise every day', 'Improve benchpress pr'];
  return (
      
        <div>
          <Grid container direction="column" spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center"}}>
            <Grid size={12}><h2>My Goals</h2></Grid>
            <Grid size="auto">{goals.map((item, i) => <Item key={i}>Goal {i+1}: {item}</Item>)}</Grid>
            <Grid size="auto"><Link to="./newGoal" className="button-link">Create New Goal</Link></Grid>
            <Grid size="auto"><Link to="/" className="button-link">Home</Link></Grid>
          </Grid>
        </div>
      );
}

export default UserGoals