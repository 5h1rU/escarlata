const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const errors = require('./api/middlewares/errors');
const { DATABASE_PASSWORD, DATABASE_URI, DATABASE_USER } = require('./config');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

mongoose
  .connect(
    `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URI}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(`Error ${err}`));

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./api/routes')(app);
Object.keys(errors).forEach(error => app.use(errors[error]));

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
