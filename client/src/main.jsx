import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx';

import DarkTheme from '../theme/DarkTheme.jsx';
import LightTheme from '../theme/LightTheme.jsx';


// I needed the functionality of useMediaQuery to figure out the system
// preference for light/dark mode. However, it uses the context hook and
// the rules of react state that all hooks need to be placed within
// components. So I made one (ThemedApp) that will return our app
// wrapped in the theme that the below logic determines.
// I didn't realize you could do this!
const ThemedApp = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const chosenTheme = prefersDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={chosenTheme}>
      <GlobalStateProvider>
        <CssBaseline disableColorScheme />
        <App />
      </GlobalStateProvider>

    </ThemeProvider>

  );

}

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemedApp/>
    </StrictMode>

)
