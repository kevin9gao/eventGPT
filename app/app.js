const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

const routes = require('./routes');

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet sets a variety of headers to secure the app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction & "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);

module.exports = app;
