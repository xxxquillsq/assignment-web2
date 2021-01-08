import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import topratedRouter from './api/topratedMovies';
import upcomingRouter from './api/upcomingMovies';
import personsRouter from './api/persons';//ca
import {loadUsers, loadMovies, loadPersons, loadTopratedMovies, loadUpcomingMovies} from './seedData';
import genresRouter from './api/genres';//exercise
import bodyParser from 'body-parser';
import './db';
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';
import loglevel from 'loglevel';

dotenv.config();


//test add
if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
} else {
  loglevel.setLevel('info')
}

if (process.env.SEED_DB === 'true' && process.env.NODE_ENV === 'development') {
  loadUsers();
}// test end

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;

// eslint-disable-next-line no-undef
if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadPersons();
  loadTopratedMovies();
  loadUpcomingMovies();
}

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.use('/api/movies', moviesRouter);//delete passport.authenticate('jwt', {session: false}), 
app.use('/api/toprated',topratedRouter);
app.use('/api/upcoming',upcomingRouter);
app.use('/api/genres',genresRouter);//exercise

app.use('/api/persons',personsRouter);//ca

//Users router
app.use('/api/users', usersRouter);
app.use(errHandler);
//update /api/Movie route

// app.listen(port, () => {
//   console.info(`Server running at ${port}`);
// });

let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

module.exports = server
