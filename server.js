'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex');


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(express.static(path.join('XXXXXX')));

// app.use('/messages',messages);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
