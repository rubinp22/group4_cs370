import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";
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
    navigate(`./profile/${state.user}`);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    navigate("../");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              }
            }}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ToolBar;
