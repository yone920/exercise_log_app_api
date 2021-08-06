const express = require('express');
// const { model } = require('mongoose');

const {
  getExercises,
  getExercise,
  createExercise,
  updateExercises,
  deleteExercises,
} = require('../controllers/exercises');

const exercises = require('../models/Exercise')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router({ mergeParams: true });

router.route('/').get(advancedResults(exercises, {
  path: 'goal',
  select: 'name',
}, grouped = true), getExercises).post(createExercise);

router
  .route('/:id')
  .get(getExercise)
  .put(updateExercises)
  .delete(deleteExercises);

module.exports = router;
