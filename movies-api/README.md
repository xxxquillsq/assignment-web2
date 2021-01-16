# Assignment 2 - Agile Software Practice.

Name: Qing Sheng

## Target Web API.


+ Get  /api/movies - returns an array of movie objects.
+ Get  /api/movies/{movieid} - returns detailed information on a specific movie.
+ Get  /api/movies/{movieid}/reviews  - Get all reviews for movie
+ Get  /api/persons - returns an array of popular person objects.
+ Get  /api/persons/{personid} - returns detailed information on a specific person.
+ Get /api/persons/{personid}/movie_credits - return a list of movie credits of a person.
+ Get  /api/upcomingMovies - returns an array of upcoming movie objects.
+ Get  /api/topratedMovies - returns an array of toprated movie objects.
+ Get  /api/users - returns an array of user objects.
+ Post /api/users - Register or authenticate a user and add a new user into database
+ Get  /api/users/{userName}/favourites - returns an array of user favpurites movies.
+ Post  /api/users/{userName}/favourites- post a movie to user favourite list
+ Get  /api/users/{userName}/watchlist - returns an array of user watchlist movies.
+ Post  /api/users/{userName}/watchlist- post a movie to user watchlist list

## Error/Exception Testing.



tests/functional/api/movies/index.js :
+ Get  /api/movies - test get movies when the user was not authorized. test get matching movies when user has authentication.  
+ Get  /api/movies/{movieid} - test get matching movies when the movieid is valid. test get movies when the movieid is invalid.
+ Get  /api/movies/{movieid}/reviews  - test get matching reviews when the movieid is valid.

tests/functional/api/persons/index.js :
+ Get  /api/persons - test get popular persons when the user was authorized. test get popular persons when user was not authorized.
+ Get  /api/persons/{personid} - test get specific person when the personid is valid. test get persons when the personid is invalid.
+ Get /api/persons/{personid}/movie_credits - test get specific person’s movie credits when the personid is valid.
  
tests/functional/api/upcoming/index.js :
+ Get  /api/upcoming - test get upcoming movies when the user was authorized. 
+ Get  /api/upcoming/{movieid} - test get matching upcoming movies when user was authentication with valid movieid. test get upcoming matching movies when user was authentication with invalid movieid.

tests/functional/api/toprated/index.js :
+ Get  /api/toprated - test get toprated movies when the user was authorized. 
+ Get  /api/toprated/{movieid} - test get matching toprated movies when user was authentication with valid movieid. test get matching toprated movies when user was authentication with invalid movieid.

tests/functional/api/users/index.js :
+ Get  /api/users - test get users list 
+ Post /api/users - test create a user with a invaild password, test create user with a right username but a wrong password, test create successfully with a userrname and vaild password.

+ Get  /api/users/{userName}/favourites - test get users favourites list with vaild username
+ Post  /api/users/{userName}/favourites- test post a movie to favourites list with vaild movie id, test post a movie to list with a included id in list 
+ Get  /api/users/{userName}/watchlist - test get users favourites list with vaild username
+ Post  /api/users/{userName}/watchlist- test post a movie to wathclist with vaild movie id, test post a movie to list with a included id in watchlist

## Continuous Delivery/Deployment.

URLs for the staging and production deployments of web API

+ https://git.heroku.com/agile2-movies-api-staging.git - Staging deployment
+ https://git.heroku.com/agile2-movies-api-production.git - Production

Screenshots from the overview page for the two Heroku apps 

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][productionapp]





[stagingapp]: ./img/stagingapp.png
[productionapp]: ./img/productionapp.png




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
