const express = require('express');
// const { model } = require('mongoose');

const {
  getExercises,
  getExercise,
  createExercise,
  updateExercises,
  deleteExercises,
} = require('../controllers/exercises');

const router = express.Router({ mergeParams: true });

router.route('/').get(getExercises).post(createExercise);
router
  .route('/:id')
  .get(getExercise)
  .put(updateExercises)
  .delete(deleteExercises);
module.exports = router;
