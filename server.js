'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex');
const path = require('path');
const cors = require('cors');
const watson = require('./routes/watson.js');
const user = require('./routes/user.js');
app.use(cors());
const hunts = require('./routes/hunts.js')
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// app.use(express.static(path.join('XXXXXX')));
app.use('/user', user);
app.use('/hunts', hunts);
// app.use('/classify', watson);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
