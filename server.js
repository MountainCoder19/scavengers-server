'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex');
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(express.static(path.join('public')));


// app.use('/watson',watson);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
