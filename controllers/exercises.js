const ErrorResponse = require('../utils/errorResponse');
const Exercise = require('../models/Exercise');

// #desc Get all exercises
// Route GET /api/v1/exercises
// Route GET /api/v1/goals/:goalId/exercises
// @access Public

exports.getExercises = async (req, res, next) => {
  try {
    let query;

    if (req.params.goalId) {
      query = Exercise.find({ goal: req.params.goalId });
    } else {
      query = Exercise.find().populate({
        path: 'goal',
        select: 'name',
      });
    }

    const exercises = await query;

    // this gives an object with dates as keys
    const groups = exercises.reduce((groups, exercises) => {
      const date = JSON.stringify(exercises.createdAt)
        .split('T')[0]
        .replace(/"/g, '');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(exercises);
      return groups;
    }, {});

    // rearange onject as an array
    const groupArrays = Object.keys(groups).map((date) => {
      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const formattedDate = new Date(date).toLocaleDateString('en-US', options);
      return {
        formattedDate,
        count: groups[date].length,
        exercises: groups[date],
      };
    });

    res.status(200).json({
      succes: true,
      count: exercises.length,
      data: groupArrays,
    });
  } catch (error) {
    next(error);
  }
};

// #desc Get a single exercises
// Routr GET /api/v1/exercises/:id
// @access Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercises = await Exercise.findById(req.params.id);
    if (!exercises)
      return next(
        new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400)
      );
    res.status(200).json({ success: true, data: exercises });
  } catch (error) {
    next(error);
  }
};

// #desc Create new  exercises
// Routr POST /api/v1/exercise
// @access Public
exports.createExercise = async (req, res, next) => {
  try {
    const exercises = await Exercise.create(req.body);
    res.status(201).json({ success: true, data: exercises });
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
