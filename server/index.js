const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Student, Campus } = require('./db');
const app = express();
const syncSeed = require('./db/syncSeed');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'..', 'public')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'..', 'client', 'index.html')))

app.get('/api/campuses', async (req, res, next) => {
  try {
    res.send(await Campus.findAll({ include:[Student]}))
  } catch (error) {
    next(error)
  }
})
app.get('/api/campuses/:id', async (req, res, next) => {
  try {
    res.send(await Campus.findByPk(req.params.id,{ include: [Student]}))
  } catch (error) {
    next(error)
  }
})
app.get('/api/students', async (req, res, next) => {
  try {
    res.send(await Student.findAll({ include:[Campus]}));
  } catch (error) {
    next(error)
  }
})

app.get('/api/students/:id', async (req, res, next) => {
  try {
    res.send(await Student.findByPk(req.params.id, { include: [Campus]}));
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