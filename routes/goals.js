const express = require('express');
const {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
  getGoal,
} = require('../controllers/goals');

const Goal = require('../models/Goal')
const advancedResults = require('../middleware/advancedResults')

// Include other resources routers
const exerciseRouter = require('./exercises');

const router = express.Router();

// Re-route into other resource routeres
router.use('/:goalId/exercises', exerciseRouter);

router.route('/').get(advancedResults(Goal, 'exercises', grouped = false), getGoals).post(createGoals);
router.route('/:id').put(updateGoals).delete(deleteGoals).get(getGoal);

module.exports = router;
