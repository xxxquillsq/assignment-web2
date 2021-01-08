import express from 'express';
import {
   getMovie, getMovieReviews, getSimilarMovies,
} from '../tmdb-api'; // ca add 
import topratedModel from './topratedModel';

const router = express.Router();
 
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  topratedModel.find().then(topratedMovies => res.status(200).send(topratedMovies)).catch(next);
});

// eslint-disable-next-line no-unused-vars
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id).then(topratedMovie => res.status(200).send(topratedMovie))
  .catch((error) => next(error));
    
});

// eslint-disable-next-line no-unused-vars
router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(topratedMoviesreviews => res.status(200).send(topratedMoviesreviews))
  .catch((error) => next(error));
});

// eslint-disable-next-line no-unused-vars
router.get('/:id/similar', (req, res, next) => {
  const id = parseInt(req.params.id);
  getSimilarMovies(id)
  .then(similarMovies => res.status(200).send(similarMovies))
  .catch((error)=> next(error));
});//ca

export default router;