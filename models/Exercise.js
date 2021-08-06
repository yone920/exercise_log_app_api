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
    unique: false,
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

ExersiceSchema.statics.getAggregateDistance = async function (goalId) {
  const obj = await this.aggregate([
    {
      $match: { goal: goalId },
    },
    {
      $group: {
        _id: '$goal',
        totalDistance: { $sum: '$distance' },
      },
    },
  ]);

  try {
    const goal = await this.model('Goal').findByIdAndUpdate(goalId, {
      totalCoveredDistance: obj[0].totalDistance,
    });
  } catch (error) {
    console.log('error:', error);
  }
};

// Call getAggregate after save
ExersiceSchema.post('save', function () {
  this.constructor.getAggregateDistance(this.goal);
});

// Call getAggregate before save
ExersiceSchema.pre('save', function () {
  this.constructor.getAggregateDistance(this.goal);
});

// Create Date
// ExersiceSchema.pre('save', function (next) {
//   console.log('middleware run', this.type);
//   next();
// });

module.exports = mongoose.model('Exercise', ExersiceSchema);
