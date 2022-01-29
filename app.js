/*
This file for run express and middleware 
*/
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//ROUTER
const replayRouter = require('./routes/replayRoute');

const app = express();

// GLOBAL MIDDLEWARE
// Set security HTTP Header
app.use(helmet());

// Development loging request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request limiter
// จำกัด 100 request ต่อ ip ในช่วง 1 ชั่วโมงเวลา
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request, please try again in an hour',
});
app.use('/api', limiter);

// Body Parser to req.body
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against noSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(hpp());

// for access file on specifict path
app.use(express.static(`${__dirname}/public`));

// Put time in request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE
// route mouting
app.use('/api/replays', replayRouter);

// Unhandled route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl}`, 404));
});

// GLOBAL HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
