const ErrorResponse = require('../utils/errorResponse');
const Goal = require('../models/Goal');

// #desc Get all exercises
// Routr GET /api/v1/exercises
// @access Public
exports.getGoals = async (req, res, next) => {
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
    query = Goal.find(JSON.parse(queryStr)).populate('exercises');

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
    const total = await Goal.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const goals = await query;

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

    res.status(200).json({
      success: true,
      count: goals.length,
      pagination,
      data: goals,
    });
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
