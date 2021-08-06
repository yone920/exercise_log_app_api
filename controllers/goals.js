const ErrorResponse = require('../utils/errorResponse');
const Goal = require('../models/Goal');

// #desc Get all exercises
// Routr GET /api/v1/exercises
// @access Public
exports.getGoals = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (error) {
    next(error);
  }
};

// #desc Get a single exercises
// Routr GET /api/v1/exercise/:id
// @access Public
exports.getGoal = async (req, res, next) => {
  try {
    const goals = await Goal.findById(req.params.id);
    if (!goals)
      return next(
        new ErrorResponse(`Goal not found with id of ${req.params.id}`, 400)
      );
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    next(error);
  }
};

// #desc Create new  exercises
// Routr POST /api/v1/exercise
// @access Public
exports.createGoals = async (req, res, next) => {
  try {
    const goals = await Goal.create(req.body);
    res.status(201).json({ success: true, data: goals });
  } catch (error) {
    next(error);
  }
};

// #desc Update exercises
// Routr PUT /api/v1/exercise/:id
// @access Public
exports.updateGoals = async (req, res, next) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!goal)
      return next(
        new ErrorResponse(`Goal not found with id of ${req.params.id}`, 400)
      );
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};

// #desc Delete exercises
// Routr DELETE /api/v1/exercise/:id
// @access Public
exports.deleteGoals = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal)
      return next(
        new ErrorResponse(`Goal not found with id of ${req.params.id}`, 400)
      );

    goal.remove();

    res
      .status(200)
      .json({ success: true, msg: `Delete goal ${req.params.id}` });
  } catch (error) {
    next(error);
  }
};
