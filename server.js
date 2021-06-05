const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
//Rout files
const exercises = require('./routes/exercises')
//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

const app = express()

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Mount routes
app.use('/api/v1/exercises', exercises);

app.use(errorHandler);


const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))