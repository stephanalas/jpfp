const express = require('express');
const studentRouter = express.Router();
const { Student, Campus } = require('../db/')


studentRouter.get('/', async (req, res, next) => {
  try {
    res.send(await Student.findAll({ include:[Campus]}));
  } catch (error) {
    next(error)
  }
})

studentRouter.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    next(error)
  }
})

studentRouter.get('/:id', async (req, res, next) => {
  try {
    res.send(await Student.findByPk(req.params.id, { include: [Campus]}));
  } catch (error) {
    next(error)
  }
})
studentRouter.put('/:id', async (req, res, next) => {
  try {
    console.log(req.body)
    const student = await Student.findByPk(req.params.id, { include: [Campus]});
    if (Object.keys(req.body).length === 0) {
      student.campusId = null;
    } else if (Object.keys(req.body).includes('campusId')) {
      student.campusId = req.body.campusId;
    } else {
      const { firstName, lastName, email, gpa, imageUrl} = req.body;
      student.firstName = firstName;
      student.lastName = lastName;
      student.email = email;
      student.gpa = gpa;
      student.imageUrl = imageUrl;
    }
    
    await student.save();
    await student.reload();
    res.status(202).send(student);
  } catch (error) {
    next(error)
  }
})
studentRouter.delete('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    console.log('student deleted');
  } catch (error) {
    next(error)
  }
});

module.exports = {
  studentRouter
}