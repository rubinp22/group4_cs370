import React, { createContext, useReducer, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

// This function defines certain actions that can take place, altering our global
// state in specific ways
// There is an action object that will be passed with two data members
// action.type triggers the switch case below
// action.payload is the data we are passing 
function reducer(state, action) {
  switch (action.type) {
    case 'SETUSER':
      return { ...state, user: action.payload };
    case 'SETTHEME':
      return { ...state, theme: action.payload };
    case 'SETWEIGHT':
      return { ...state, bodyWeight: action.payload };
    case 'SETFITNESS':
      return { ...state, fitnessLevel: action.payload };
    default:
      return state;
  }
}

// Think of this as the "schema" for our state. We may find that we want to store
// more data for our global state in the future, so we would start here.
const initialState = {
  user: "",
  theme: "",
  bodyWeight: "",
  fitnessLevel: ""
}

export const GlobalStateProvider = ({ children }) => {

  // Here, useReducer returns the current state and a dispatch function.
  // dispatch is used to send actions to the reducer to update the state.
  // Example: dispatch({ type: 'SETUSER', payload: 'someUserID' });
  // So this state is effectively passed to the rest of our app!
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // Passing our state to the root of the app and all its children (sub components)
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;
