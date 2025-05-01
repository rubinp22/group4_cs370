import { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Link as MuiLink
} from "@mui/material";
import GlobalStateContext from "../contexts/GlobalStateContext";

function ToolBar() {
  const { state } = useContext(GlobalStateContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(`/HomePage/profile/${state.user}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }} marginBottom={"5%"}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            ☰
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/HomePage"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Fitness Tracker
          </Typography>

          <Avatar src={state.pfp} />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 230,
              },
              "& .MuiMenuItem-root:hover": {
               backgroundColor: "transparent", 
               color: "yellow", 
              },
               "& a:hover": {
              color: "yellow", 
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>

            <MenuItem
              component={RouterLink}
               to="../"
               onClick={handleMenuClose}
            >
               {state.user === "" ? "Log In" : "Log Out"}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ToolBar;