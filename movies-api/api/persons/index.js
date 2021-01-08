import express from 'express';
import {
 
} from '../tmdb-api'; // ca add 
import personModel from './personModel';

const router = express.Router();
 
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  personModel.find().then(persons => res.status(200).send(persons)).catch(next);
});

module.exports= router;