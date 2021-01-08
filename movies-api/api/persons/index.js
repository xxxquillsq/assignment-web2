import express from 'express';
import {getPerson,  getPersonMovie_credits
 
} from '../tmdb-api'; // ca add 
import personModel from './personModel';

const router = express.Router();
 
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  personModel.find().then(persons => res.status(200).send(persons)).catch(next);
});

// eslint-disable-next-line no-unused-vars
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getPerson(id).then(person => res.status(200).send(person))
  .catch((error) => next(error));
    
});

// eslint-disable-next-line no-unused-vars
router.get('/:id/movie_credits', (req, res, next) => {
  const id = parseInt(req.params.id);
  getPersonMovie_credits(id)
  .then(credits => res.status(200).send(credits))
  .catch((error) => next(error));
});


module.exports= router;