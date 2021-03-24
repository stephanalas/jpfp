const express = require('express');
const { Student, Campus } = require('../db');
const router = express.Router();

// /api
router.get('/campuses', async (req, res, next) => {
  try {
    res.send(await Campus.findAll({ include:[Student]}))
  } catch (error) {
    next(error)
  }
})
router.post('/campuses', async (req, res, next) => {
  try {
    console.log(req.body)
    res.status(201).send(await Campus.create(req.body))
  } catch (error) {
    next(error)
  }
})
router.get('/campuses/:id', async (req, res, next) => {
  try {
    res.send(await Campus.findByPk(req.params.id,{ include: [Student]}))
  } catch (error) {
    next(error)
  }
})
router.get('/students', async (req, res, next) => {
  try {
    res.send(await Student.findAll({ include:[Campus]}));
  } catch (error) {
    next(error)
  }
})
router.post('/students', async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (error) {
    next(error)
  }
})

router.get('/students/:id', async (req, res, next) => {
  try {
    res.send(await Student.findByPk(req.params.id, { include: [Campus]}));
  } catch (error) {
    next(error)
  }
})

module.exports = router;