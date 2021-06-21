const mongoose = require('mongoose');

const ExersiceSchema = new mongoose.Schema({
  activity: {
    type: String,
    enum: ['Running', 'Walking', 'Pushup'],
    required: [true, 'Please add a name'],
    maxLength: [50, 'Type can not be more than 50 charachters'],
  },
  description: {
    type: String,
    maxLength: [400, 'Description can not be more than 400 charachters'],
  },
  distance: {
    type: Number,
  },
  goal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Goal',
    required: false,
  },
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
