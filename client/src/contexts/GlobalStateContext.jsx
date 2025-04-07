import React, { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalStateContext = createContext();

// This function defines certain actions that can take place, altering our global
// state in specific ways
// There is an action object that will be passed with two data members
// action.type triggers the switch case below
// action.payload is the data we are passing 
// Note: For now I have SETTHEME as an action, but since that will all be handled through
// the DB, it is temporary
function reducer(state, action) {
  switch (action.type) {
    case 'SETUSER':
      return { ...state, user: action.payload };
    case 'SETTHEME':
      console.log("SETTHEME: setting theme to: ", action.payload);
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const initialState = {
  user: "",
  theme: ""
}

export const GlobalStateProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [userData, setUserData] = useState(undefined);
    const userID = "67f1a53185ffddaa0be300ca";

    console.log("state.user: ", state.user);

  useEffect(() => {
    async function getProfileData() {
      try {
        const res = await axios.get('http://localhost:3000/users', {
          headers: {
            'Content-Type': 'application/json'
          },
          params: { _id: userID }
        });
        setUserData(res.data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    getProfileData();
  }, [userID]);

  // console.log("userData = ", userData);


  return (
    <GlobalStateContext.Provider value={{ state, dispatch, userData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;
