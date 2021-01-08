import React, { useState, createContext, useEffect, useReducer } from "react";
import { getTopratedMovies } from "../api/movie-api";

export const TopratedMoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { topratedMovies: action.payload.result};
    default:
      return state;
  }
};

const TopratedMoviesContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { topratedMovies: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getTopratedMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  return (
    <TopratedMoviesContext.Provider
      value={{
        topratedMovies: state.topratedMovies,
        setAuthenticated
      }}
    >
      {props.children}
    </TopratedMoviesContext.Provider>
  );
};

export default TopratedMoviesContextProvider