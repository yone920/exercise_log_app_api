const ErrorResponse = require('../utils/errorResponse');
const Exercise = require('../models/Exercise');
const Goal = require('../models/Goal');

// #desc Get all exercises
// Route GET /api/v1/exercises
// Route GET /api/v1/goals/:goalId/exercises
// @access Public

exports.getExercises = async (req, res, next) => {
  try {
    if (req.params.goalId) {
      const exercises = await Exercise.find({ goal: req.params.goalId });

      res.status(200).json({
        succes: true,
        count: exercises.length,
        data: exercises
      })
    } else {
      res.status(200).json(res.advancedResults)
    }


  } catch (error) {
    next(error);
  }
};

// #desc Get a single exercises
// Routr GET /api/v1/exercises/:id
// @access Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate({
      path: 'goal',
      select: 'name activity',
    });

    if (!exercise)
      return next(
        new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400)
      );

    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    next(error);
  }
};

// #desc Create new  exercises
// Rouer POST /api/v1/goals/:goalId/exercises
// @access Private
exports.createExercise = async (req, res, next) => {
  try {
    req.body.goal = req.params.goalId;

    const goal = await Goal.findById(req.params.goalId);

    if (!goal) {
      return next(
        new ErrorResponse(`Goal not found with id of ${req.params.goalId}`, 404)
      );
    }

    const exercise = await Exercise.create(req.body);
    res.status(201).json({ success: true, data: exercise });
  } catch (error) {
    next(error);
  }
};

// #desc Update exercises
// Routr PUT /api/v1/exercise/:id
// @access Public
exports.updateExercises = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exercise)
      return next(
        new ErrorResponse(`exercise not found with id of ${req.params.id}`, 400)
      );
    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    next(error);
  }
};

// #desc Delete exercises
// Routr DELETE /api/v1/exercise/:id
// @access Public
exports.deleteExercises = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise)
      return next(
        new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400)
      );

    await exercise.remove();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
