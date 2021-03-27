const express = require('express');
const { Student, Campus } = require('../db');
const router = express.Router();

// /api
router.get('/campuses', async (req, res, next) => {
  try {
    if ((await Campus.findAll()).length) {
      res.send(await Campus.findAll({ include:[Student]}))
    } else {
      res.send(await Campus.findAll())
    }
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

router.delete('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    console.log('campus deleted');
  } catch (error) {
    next(error)
  }
})

router.post('/campuses', async (req, res, next) => {
  try {
    console.log(req.body)
    res.status(201).send(await Campus.create(req.body, { include: [Student]}))
  } catch (error) {
    next(error)
  }
})
router.put('/campuses/:id', async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const campus = await Campus.findByPk(req.params.id, { include: [Student]});
    campus.name = name;
    campus.address = address;
    await campus.save();
    await campus.reload();
    res.status(202).send(campus);
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
router.put('/students/:id', async (req, res, next) => {
  try {
    console.log(req.body)
    const student = await Student.findByPk(req.params.id, { include: [Campus]});
    if (Object.keys(req.body).length === 0) {
      student.campusId = null;
    } else {
      const { firstName, lastName, email} = req.body;
      student.firstName = firstName;
      student.lastName = lastName;
      student.email = email;
    }
    
    await student.save();
    await student.reload();
    res.status(202).send(student);
  } catch (error) {
    console.log(error)
  }
})
router.delete('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    console.log('student deleted');
  } catch (error) {
    next(error)
  }
})

module.exports = router;