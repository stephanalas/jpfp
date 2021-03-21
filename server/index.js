const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {syncSeed, models: { Campus, Student}} = require('./db')
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'..', 'public')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'..', 'client', 'index.html')))

app.get('/api/campuses', async (req, res, next) => {
  try {
    res.send(await Campus.findAll())
  } catch (error) {
    next(error)
  }
})
app.get('/api/students', async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (error) {
    next(error)
  }
})

const init = () => {
  syncSeed()
  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`app is listening on port: ${port}`));
}

init();