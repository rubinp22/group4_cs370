import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


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

function ProfilePage () {
    return (
      <div>
        <Grid container spacing={2}>
          {/*Profile picture*/}
          <Grid display="flex" justifyContent="left" alignItems="left" size="auto"> 
            <Avatar
            sx={{ width: 100, height: 100}}
            alt="John Smith"
            src=""
            ></Avatar>
          </Grid>

          {/*Name*/}
          <Grid display="flex" justifyContent="flex-start" alignItems="left" size={8}>
          <h2>John Smith</h2>
          </Grid>

          <br/>

          {/*Stats*/}
          <Grid container direction="column" display="flex" justifyContent="flex-start" alignItems="flex-start" size={8} spacing={0}>  
            <Item>
              <p>Height: 5'10" | Weight: 154</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

          {/*Home Button*/}
          <Grid display="flex" justifyContent="center" alignItems="center" size={12}>
            <Link to="/" className="button-link">Home</Link>
          </Grid>

        </Grid>
      </div>
      );
}

export default ProfilePage