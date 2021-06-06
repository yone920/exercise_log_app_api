const ErrorResponse = require('../utils/errorResponse');
const Exercise = require('../models/Exercise');

// #desc Get all exercises
// Routr GET /api/v1/bootcamps
// @access Public
exports.getExercises = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    //Fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page'];

    removeFields.forEach((param) => delete reqQuery[param]);
    // Create qury string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte ...)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resources
    query = Exercise.find(JSON.parse(queryStr));

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Exercise.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const exercises = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // this gives an object with dates as keys
    const groups = exercises.reduce((groups, exercise) => {
      const date = JSON.stringify(exercise.createdAt)
        .split('T')[0]
        .replace(/"/g, '');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(exercise);
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
      success: true,
      count: exercises.length,
      pagination,
      data: groupArrays,
    });
  } catch (error) {
    next(error);
  }
};

// #desc Get a single exercises
// Routr GET /api/v1/bootcamp/:id
// @access Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
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
// Routr POST /api/v1/exercise
// @access Public
exports.createExercises = async (req, res, next) => {
  try {
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
        new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400)
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
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise)
      return next(
        new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400)
      );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
