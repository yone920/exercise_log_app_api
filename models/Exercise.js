const mongoose = require('mongoose');

const ExersiceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Running', 'Walking'],
    required: [true, 'Please add a name'],
    maxLength: [50, 'Type can not be more than 50 charachters'],
  },
  description: {
    type: String,
    required: false,
    maxLength: [400, 'Description can not be more than 400 charachters'],
    unique: false,
  },
  distance: {
    type: Number,
    required: [true, 'Please add a number'],
  },
  // goal: {
  //   type: String,
  //   required: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Date
// ExersiceSchema.pre('save', function (next) {
//   console.log('middleware run', this.type);
//   next();
// });

module.exports = mongoose.model('Exercise', ExersiceSchema);
