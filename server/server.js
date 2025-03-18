const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const dotenv = require('dotenv');
const DBConnection = require('./db/DBConnection');

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/user');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orderRoutes');

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
DBConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure CORS to allow requests from the frontend (running on port 3000)
app.use(cors({
  origin: 'http://localhost:5173',  // Adjust this if your frontend is running on a different domain
  credentials: true,  // Allow cookies to be sent with requests
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Global error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Respond with JSON error message
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

// Set the port and start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
