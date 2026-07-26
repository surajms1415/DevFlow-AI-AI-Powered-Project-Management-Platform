const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/v1');
const { errorHandler } = require('./middlewares/error');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit repeated failed requests to API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', apiLimiter);

// Parse json request body
app.use(express.json());
// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize data against NoSQL injection & XSS
app.use(mongoSanitize());
app.use(xss());

// gzip compression
app.use(compression());

// Enable cors
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Parse cookies
app.use(cookieParser());

// Logger middleware
app.use(morgan('dev'));

// v1 api routes
app.use('/api/v1', routes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
