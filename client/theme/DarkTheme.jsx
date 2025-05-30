import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, amber } from '@mui/material/colors';
import { backdropClasses } from '@mui/material';

// This theme overrides all components that are listed (All MUI Buttons, Links, Cards, and some TextFields)
// The override for MuiCard has special rules for styling text fields that are located within
// MuiCards. I'm think that text fields that aren't nested in cards won't inherit the styling
// rules defined here.
const DarkTheme = createTheme({
  palette: {
    primary: {
      // non-hover text
      light: grey[50],
      // hover 
      mediumLight: grey[400],
      // non-hover
      main: grey[600],
      // hover text
      dark: grey[900]
    },
    secondary: {
      // non-hover
      main: amber[600],
      // hover
      dark: amber[800],
      // card background
      light: amber[100]
    },
    black: {
      main: "#121212"
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: ( theme ) => ({
        body: {
          backgroundColor: theme.palette.black.main,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '12px 18px',
          // 12px applies to the top/bottom, 18px applies to left/right
          borderRadius: '5px',
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.dark,
          fontSize: '18px',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
            transition: "background-color 0.5s ease, color 0.5s ease",
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.light,
          fontSize: '18px',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
            transition: "background-color 0.5s ease, color 0.5s ease",
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          // You will see this syntax a lot. We are targetting an element within all the nested
          // elements of a TextField that has a specific class name. This allows us to really
          // customize all MUI components on a granular level (unless they are MUI-X graphs 🙃)

          '& .MuiTypography-root': {
            color: theme.palette.secondary.main,
          },
          // Targeting the root of a TextField 
          '.MuiTextField-root': {  
            backgroundColor: theme.palette.primary.dark,
          },
          // Targeting the label of the TextField 
          '.MuiFormLabel-root': {
            color: theme.palette.secondary.main,
            fontSize: "18px",
          },
          // Targeting the label of the TextField when it's focused (when you click it)
          // Otherwise, the text color reverts to a grey when focused.
          '.MuiFormLabel-root.Mui-focused': {
            color: theme.palette.secondary.main,
          },
          // Targeting the input that user types into a TextField to have it change color
          // and be more visible. Also a larger font
          '.MuiFilledInput-input': {
            color: theme.palette.secondary.dark,
            fontSize: "24px"
          }
        }),
      },
    },
    // InputAdornment components are present at the right-side of TextFields where there is a 
    // labled unit (like Miles, Hours, Kg, etc...)
    // The underlying text of this component is a Typography component, so I need to target the
    // root class of Typography. This won't change other Typography elements' style unless they
    // are found within an InputAdornment component. 
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          '.MuiTypography-root': {
            color: theme.palette.secondary.main,
            fontSize: "24px"
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.dark
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.dark,
            fontSize: "20px"
        })
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.primary.dark,
          fontSize:"24px",
          '.MuiSelect-filled': {
            color: theme.palette.secondary.main
          }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:not(.MuiChartsTooltip-root *):not(.MuiInputAdornment-root *):not(.MuiCard-root *):not(.MuiToolbar-root *)': {
            color: theme.palette.primary.light,
          },
        })
      }
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          fontSize: 16,
          margin: 5
        })
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.medium,
          '& .MuiTypography-root': {
            color: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          '& .MuiSlider-valueLabelOpen': {
            backgroundColor: theme.palette.secondary.main
          },
          '& .MuiSlider-valueLabelLabel': {
            color: theme.palette.primary.dark,
            fontSize: 18
          },
          '& .MuiSlider-mark': {
            width: "8px",
            height: "8px",
            borderRadius: "100%"
          },
          '& .MuiSlider-markActive': {
            backgroundColor: theme.palette.primary.dark
          },
          '& .MuiSlider-thumb': {
            color:theme.palette.secondary.dark
          }
        })
      }
    }
  },
});


export default DarkTheme;
