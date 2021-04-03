const { Model, DataTypes } = require('sequelize');
const db = require('./index')

class Student extends Model {}

Student.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'image not found'
  },
  gpa: {
    type: DataTypes.FLOAT,
    // allowNull: false,
    validate: {
      isFloat: true,
      min: 0.0,
      max: 4.0
    }
  }
}, {sequelize:db, modelName:'students'})

module.exports = {
  Student

}