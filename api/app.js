const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const config = require('../config/index');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect(config.db, {
        useNewUrlParser: true
    }
    /* , () => {
        console.log('Database connected');
    } */
);

module.exports = app;