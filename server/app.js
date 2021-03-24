const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', require('./routes'))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'..', 'client', 'index.html')))

module.exports = app;
