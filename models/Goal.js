const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    activity: {
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
    totalCoveredDistance: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete courses when a goal is deleted
GoalSchema.pre('remove', async function (next) {
  await this.model('Exercise').deleteMany({ goal: this._id });
  next();
});

// Rverse populate with virtuals
GoalSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'goal',
  justOne: false,
});

module.exports = mongoose.model('Goal', GoalSchema);
