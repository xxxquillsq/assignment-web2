import React, { useState, createContext, useEffect, useReducer } from "react";
import { getPopulerPerson } from "../api/movie-api";

export const PersonsContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { persons: action.payload.result};
    default:
      return state;
  }
};

const PersonsContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { persons: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getPopulerPerson().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  return (
    <PersonsContext.Provider
      value={{
        persons: state.persons,
        setAuthenticated
      }}
    >
      {props.children}
    </PersonsContext.Provider>
  );
};

export default PersonsContextProvider