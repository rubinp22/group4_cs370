import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import DarkTheme from '../theme/DarkTheme.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider theme={DarkTheme}>
        <App />
      </ThemeProvider>
      
    </StrictMode>

)
