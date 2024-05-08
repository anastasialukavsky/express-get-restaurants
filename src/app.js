const express = require("express");
const app = express();
// const Restaurant = require("../models/Restaurant")
const db = require("../db/connection");
const bodyParser = require('body-parser');
const restaurantsRouter = require('./routes/routes');



app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/restaurants', restaurantsRouter);



module.exports = app;