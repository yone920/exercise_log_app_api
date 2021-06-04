const Exercise = require('../models/Exercise')

// #desc Get all exercises
// Routr GET /api/v1/bootcamps
// @access Public
exports.getExercises = (req, res, next) => {
  res.status(200).json({success: true, msg: "Show all exercise"});
}

// #desc Create new  exercises
// Routr POST /api/v1/exercise
// @access Public
exports.createExercises = async (req, res, next) => {
  console.log(req.body)
  const exercise = await Exercise.create(req.body)
  res.status(201).json({success: true, data: exercise});
}

// #desc Update exercises
// Routr PUT /api/v1/exercise
// @access Public
exports.updateExercises = (req, res, next) => {
  res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`});
}

// #desc Delete exercises
// Routr DELETE /api/v1/exercise
// @access Public
exports.deleteExercises = (req, res, next) => {
  res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`});
}