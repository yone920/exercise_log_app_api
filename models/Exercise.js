const mongoose = require('mongoose');

const ExersiceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Running", "Walking"],
    require: [true, 'Please add a name'],
    maxLength: [50, "Type can not be more than 50 charachters"]
  },
  description: {
    type: String,
    required: false,
    maxLength: [400, "Description can not be more than 400 charachters"]
  },
  distance: {
    type: Number,
    required: [true, 'Please add a number'],
    unique: true
  },
  // goal: {
  //   type: String,
  //   required: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exercise', ExersiceSchema)