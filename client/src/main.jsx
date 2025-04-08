import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import DarkTheme from '../theme/DarkTheme.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline disableColorScheme />
        <App />
      </ThemeProvider>
      
    </StrictMode>

)
