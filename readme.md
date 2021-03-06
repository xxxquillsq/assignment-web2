# Assignment 2 - Web API.

Name: Qing Sheng

## Features.

 + Feature 1 - more than 3 new API endpoint.
 + Feature 2 - Coherent API design and modelling supporting full manipulation of resources.
 + Feature 3 - Nested Document and object referencing in Mongo/Mongoose
 + Feature 4 - Custom validation using Mongoose.
 + Feature 5 - Basic Authentication and protected routes.
 + Feature 6 - Error handling.
 + Feature 7 - Link some of my API endponit in this assignment with my assignment1-MoviesApp.

## Installation Requirements

clone:

```bat
git clone https://github.com/xxxquillsq/assignment-web2.git
```

followed by installation

```bat
git install
```
open a new terminal on file 'movies-api',but not open by root file.
```bat
npm install
```
```bat
npm start
```
Link to sample React App.
same as before, open a new terminal on file 'reactApp',but not open by root file.
```bat
npm start
```
or link to my MoviesApp of assignment1
```bat
git clone hhttps://github.com/xxxquillsq/wad2-moviesApp.git
```

followed by installation

```bat
git install
```
Exit sample reactapp, leave movies-api running, start MoviesApp
```bat
npm start
```
## API Configuration
Configuration that needs to take place before running the API.

+ creating an ``.env`` file. in 'movies-api' file.
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=tmdbKey
mongoDB=mongodb+srv://admin:mypassword@cluster0.smkbs.mongodb.net/databasename?retryWrites=true&w=majority
SEED_DB=true
SECRET=JWTSecret
HEROKU_API_KEY=myherokuapiKEY
HEROKU_APP_NMAE_STAGING=agile2-movies-api-staging
```
+ creating an ``.babelrc`` file. in 'movies-api' file.
```bat
{
  "presets": [
      "@babel/preset-env" 

    ],
    "plugins": [
      ["@babel/transform-runtime"]
  ]
}
```
+ creating an ``.gitignore`` file. in 'movies-api' file.
```bat
/node_modules
.DS_S*
/**/.DS_S*
/build
.env
/.vscode
```
## API Design
Overview of my web API design:

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/persons | Get a list of popular persons | N/A | N/A | N/A
| /api/persons/{personid} | Get a person | N/A | N/A | N/A.
| /api/persons/{personid}/movie_credits | Get a list of movie credits of a person | N/A | N/A | N/A
| /api/upcomingMovies | Gets a list of upcoming movies | N/A | N/A | N/A
| /api/topratedMovies | Gets a list of toprated movies | N/A | N/A | N/A
| /api/movies/{movieid}/similar | Get similar movies of a movie | N/A | N/A | N/A
| /api/users  | Gets all users | Register or authenticate a user | N/A | N/A
| /api/users/{userid} | N/A | N/A | Update a user | N/A
| /api/users/{userName}/favourites | Get user favourite movie list | post a movie to favourite list | N/A | N/A
| /api/users/{userName}/watchlist  | Get user movie watchlist | post a movie to watchlist | N/A | N/A
| ... | ... | ... | ... | ...


## Security and Authentication
only correct username with correct user passward can go into proected routes
+ passwords are limited in format (need letters and numbers)
+ protected routes :
  +  /api/movies(moviesRouter) 
  + /api/toprated (topratedRouter)
  + /api/upcoming(upcomingRouter)
  
## Integrating with React App

Add below port into the bottom of the ``package.jason`` in my MoviesApp
```bat
,
  "proxy": "http://localhost:8080"
```
and change  ``tmdb-api.js`` with my new API 
~~~Javascript
export const login = (username, password) => {
  return fetch('/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const signup = (username, password) => {
  return fetch('/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getPopulerPerson = () => {
  return fetch(
     '/api/persons',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getTopratedMovies = () => {
  return fetch(
     '/api/toprated',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

export const getUpcomingMovies = () => {
  return fetch(
     '/api/upcoming',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};
~~~


## Extra features

+ Feature 1 - Dynamic and interactive UI.
+ Feature 2 - Web form.
+ Feature 3 - Extensive data hyperlinking.
+ Feature 4 - Storybook support.
+ Feature 5 - Styled Components 3rd party components.

