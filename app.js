/*
This file for run express and middleware 
*/
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const express = require('express');
const morgan = require('morgan');
const app = express();

// own import
const infoRouter = require('./routes/infoRoutes');
const userRouter = require('./routes/userRoutes');
const classroomRouter = require('./routes/classroomRoutes');

// MIDDLEWARE

//Middleware if in dev mode
if (process.env.NODE_ENV === 'development') {
  // for dev loggin
  app.use(morgan('dev'));
}

// for get body as object
app.use(express.json());
// Example middleware
/*
app.use((req, res, next) => {
  // applying for every request
  console.log('Hello from middleware');
  next();
});
*/
// for access file on specifict path
app.use(express.static(`${__dirname}/public`));

// Put time in request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// ROUTE
// route mouting
app.use('/api/test/informations', infoRouter);
app.use('/api/users', userRouter);
app.use('/api/classrooms', classroomRouter);

// Unhandled route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl}`, 404));
});

// GLOBAL HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
