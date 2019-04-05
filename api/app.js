const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
}, () => {
    console.log('Database connected');
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});