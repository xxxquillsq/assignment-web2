import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import topratedModel from '../api/topratedMovies/topratedModel';
import upcomingModel from '../api/upcomingMovies/upcomingModel';
import personModel from '../api/persons/personModel';
import {persons} from './persons.js';
import {movies} from './movies.js';
import {topratedMovies} from './toprated.js';
import {upcomingMovies} from './upcoming.js';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }

  // deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

 
  export async function loadTopratedMovies() {
    console.log('load top rated movies data');
    console.log(topratedMovies.length);
    try {
      await topratedModel.deleteMany();
      await topratedModel.collection.insertMany(topratedMovies);
      console.info(`${topratedMovies.length} Top rated Movies were successfully stored.`);
  } catch (err) {
      console.error(`failed to Load top rated movie Data: ${err}`);
    }
  }

  export async function loadUpcomingMovies() {
    console.log('load upcoming movies data');
    console.log(upcomingMovies.length);
    try {
      await upcomingModel.deleteMany();
      await upcomingModel.collection.insertMany(upcomingMovies);
      console.info(`${upcomingMovies.length} Upcoming Movies were successfully stored.`);
  } catch (err) {
      console.error(`failed to Load upcoming movie Data: ${err}`);
    }
  }

  // deletes all movies documents in collection and inserts test data
  export async function loadPersons() {
    console.log('load person data');
    console.log(persons.length);
    try {
      await personModel.deleteMany();
      await personModel.collection.insertMany(persons);
      console.info(`${persons.length} Popular persons were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load person Data: ${err}`);
    }
  }