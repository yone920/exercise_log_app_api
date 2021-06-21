const express = require('express');
const {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
  getGoal,
} = require('../controllers/goals');

// Include other resources routers
const exerciseRouter = require('./exercises');

const router = express.Router();

// Re-route into other resource routeres
router.use('/:goalId/exercises', exerciseRouter);

router.route('/').get(getGoals).post(createGoals);
router.route('/:id').put(updateGoals).delete(deleteGoals).get(getGoal);

module.exports = router;
