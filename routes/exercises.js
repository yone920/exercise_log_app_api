const express = require('express');
const {getExercises, createExercises, updateExercises, deleteExercises, getExercise} = require('../controllers/exercises')

const router = express.Router();

router.route('/').get(getExercises).post(createExercises);
router.route('/:id').put(updateExercises).delete(deleteExercises).get(getExercise)


module.exports = router;