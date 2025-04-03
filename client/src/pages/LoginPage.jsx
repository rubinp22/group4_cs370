
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Button, Stack } from '@mui/material';
function LoginPage(){

    return(<>
    <Button to="./HomePage" component={RouterLink}>Back to Home</Button>
    </>);
}

export default LoginPage