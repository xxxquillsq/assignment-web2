import React, { useState, createContext, useEffect, useReducer } from "react";
import { getUpcomingMovies } from "../api/movie-api";

export const UpcomingMoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { upcomingMovies: action.payload.result};
    default:
      return state;
  }
};

const UpcomingMoviesContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { upcomingMovies: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getUpcomingMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  return (
    <UpcomingMoviesContext.Provider
      value={{
        upcomingMovies: state.upcomingMovies,
        setAuthenticated
      }}
    >
      {props.children}
    </UpcomingMoviesContext.Provider>
  );
};

export default UpcomingMoviesContextProvider