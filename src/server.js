'use strict'

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const foodRoutes = require('./routes/custom-routes-food.js');
const clothesRoutes = require('./routes/custom-routes-clothes.js');

const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/food';

const options = { useNewUrlParser: true, useUnifiedTopology: true } 
mongoose.connect(MONGODB_URI, options);

app.use(express.json());

app.use(logger);
app.use(foodRoutes);
app.use(clothesRoutes);

app.use('*', notFound);
app.use(errors);

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`server up: ${port}`));
    }
}