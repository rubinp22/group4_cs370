import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx';

import DarkTheme from '../theme/DarkTheme.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </ThemeProvider>
      
    </StrictMode>

)
