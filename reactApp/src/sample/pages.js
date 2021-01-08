import React from 'react';
import { useContext} from 'react';
import { MoviesContext } from './moviesContext';
import {UpcomingMoviesContext } from './upcomingMoviesContext';
import {TopratedMoviesContext } from './topratedMoviesContext';
import { PersonsContext } from './personsContext';

export const PublicPage = () => {
    return <h2>Public page</h2>
 }
 export const Movies = () => {
    const context = useContext(MoviesContext);
    return <>
        <h2>Movies Data </h2>
        <div>
            {context.movies.map(movie => { return <>{movie.id},{movie.title}<br /></> })}
        </div>
    </>
 }

 export const UpcomingMovies = () => {
    const context = useContext(UpcomingMoviesContext);
    return <>
        <h2>UpcomingMovies Data </h2>
        <div>
            {context.upcomingMovies.map(upcomingMovie => { return <>{upcomingMovie.id},{upcomingMovie.title}<br /></> })}
        </div>
    </>
 }

 export const TopratedMovies = () => {
    const context = useContext(TopratedMoviesContext);
    return <>
        <h2>TopratedMovies Data </h2>
        <div>
            {context.topratedMovies.map(topratedMovie => { return <>{topratedMovie.id},{topratedMovie.title}<br /></> })}
        </div>
    </>
 }

 export const Persons = () => {
    const context = useContext(PersonsContext);
    return <>
        <h2>Persons Data </h2>
        <div>
            {context.persons.map(person => { return <>{person.id},{person.name}<br /></> })}
        </div>
    </>
 }

 export const Profile = () => {
    return <h2>My Profile </h2>
}
 export const HomePage = () => {
     return  <h2>Home page</h2>
 }
 