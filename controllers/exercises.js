const ErrorResponse = require('../utils/errorResponse')
const Exercise = require('../models/Exercise')

// #desc Get all exercises
// Routr GET /api/v1/bootcamps
// @access Public
exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find()
    res.status(200).json({success: true, count: exercises.length, data: exercises})
  } catch (error) {
    next(error)
  }
}

// #desc Get a single exercises
// Routr GET /api/v1/bootcamp/:id
// @access Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
    if (!exercise) return  next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400))
    res.status(200).json({success: true, data: exercise})
  } catch (error) {
    next(error)
  }
}

// #desc Create new  exercises
// Routr POST /api/v1/exercise
// @access Public
exports.createExercises = async (req, res, next) => {
  console.log(req.body)
  try {
    const exercise = await Exercise.create(req.body)
    res.status(201).json({success: true, data: exercise});
  } catch (error) {
    next(error)
  }
}

// #desc Update exercises
// Routr PUT /api/v1/exercise/:id
// @access Public
exports.updateExercises = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!exercise) return  next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400))
    res.status(200).json({success: true, data: exercise})
  } catch (error) {
    next(error)
  }
}

// #desc Delete exercises
// Routr DELETE /api/v1/exercise/:id
// @access Public
exports.deleteExercises = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id)
    if (!exercise) return  next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 400))
    res.status(200).json({success: true})
  } catch (error) {
    next(error)
  }
  res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`});
}