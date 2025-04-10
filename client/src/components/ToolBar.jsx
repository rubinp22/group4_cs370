import { Button, Typography, Stack, AppBar, Toolbar, IconButton, Box } from "@mui/material";

function ToolBar(){
    return(<Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute">
          <ToolBar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
          </ToolBar>
        </AppBar>
      </Box>);
}

export default ToolBar;