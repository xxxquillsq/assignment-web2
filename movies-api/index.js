import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import similarMoviesRouter from './api/movies';//ca
import {loadUsers, loadMovies} from './seedData';
import genresRouter from './api/genres';//exercise
import bodyParser from 'body-parser';
import './db';
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';


dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;

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


// eslint-disable-next-line no-undef
if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
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

app.use('/api/genres',genresRouter);//exercise
app.use('/api/movie/:id/similar', similarMoviesRouter);//ca

//Users router
app.use('/api/users', usersRouter);
app.use(errHandler);
//update /api/Movie route

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
