const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Exercise = require('./models/Exercise');

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files
const exercises = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/exercises.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Exercise.create(exercises);
    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log('error:', error);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Exercise.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log('error:', error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
