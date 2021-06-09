const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  exerciseType: {
    type: String,
    enum: ['Running', 'Walking'],
    required: [true, 'Please add a name'],
    maxLength: [50, 'Type can not be more than 50 charachters'],
  },
  distance: {
    type: Number,
    required: [true, 'Please add a number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fromDate: {
    type: Date,
    required: false,
  },
  toDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('Goal', GoalSchema);
