import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
      MuiLink: { 
        styleOverrides: {
          root: {
            textDecoration: 'none',
            padding: '12px 18px',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'center',
            fontSize: '18px',
          },
        },
      },
    },
  });

export default theme;

// const theme = createTheme({
//     light: {
//         primary: '#fff',
//         text: '#000',
//         backgroundColor: "#ffffff",
//         transition: "background-color 0.3s ease, color 0.3s ease",
//     },
//     dark: {
//         primary: '#000',
//         text: '#fff',
//         backgroundColor: "#121212",
//         transition: "background-color 0.3s ease, color 0.3s ease",
//     }
// });

// export default theme;

// const styles = {
//     container: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh", //covers the full screen height
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//       backgroundColor: darkMode ? "#121212" : "#ffffff",
//       color: darkMode ? "#ffffff" : "#000000",
//       transition: "background-color 0.3s ease, color 0.3s ease",
//       overflow: "hidden", //avoids issues with scrolling
//     },
//     button: {
//       padding: "10px 20px",
//       border: "none",
//       cursor: "pointer",
//       backgroundColor: darkMode ? "#f39c12" : "#007bff",
//       color: darkMode ? "#000000" : "#ffffff",
//       fontSize: "16px",
//       borderRadius: "5px",
//       marginBottom: "20px",
//       transition: "background-color 0.3s ease, color 0.3s ease",
//     },
//     buttonContainer: {
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: "20px",
//       width: "80%",
//       maxWidth: "500px",
//     },
//     link: {
//       textDecoration: "none",
//       padding: "12px 18px",
//       borderRadius: "5px",
//       backgroundColor: darkMode ? "#444" : "#007bff",
//       color: "#fff",
//       textAlign: "center",
//       fontSize: "18px",
//       transition: "background-color 0.3s ease, color 0.3s ease",
//     },
//   };