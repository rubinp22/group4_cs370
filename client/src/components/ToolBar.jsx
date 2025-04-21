import { useContext } from "react";
import { Typography, AppBar, Toolbar, IconButton, Box, Avatar } from "@mui/material";
import GlobalStateContext from "../contexts/GlobalStateContext";


function ToolBar() {
  const { state } = useContext(GlobalStateContext);

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
          >
            {/* Optional icon */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fitness Tracker
          </Typography>
          <Avatar src={state.pfp} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ToolBar;